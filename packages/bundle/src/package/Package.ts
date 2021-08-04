import {join} from "path";
import {getPackageName} from "../internal";
import {PackageResourceConfig} from "./PackageResourceConfig";

const packages = new Map<string, Package>();

export class Package {
    public readonly name: string;
    public readonly path: string;
    public readonly config: Record<string, any>;
    public readonly isComponentLibrary: boolean = false;
    public readonly resourceListFilename: string = "resources.json";

    constructor(path: string, name: string) {
        this.name = name;
        this.path = path;
        this.config = require(join(path, "package.json"));

        const {component} = this.config;

        if (typeof component === "object" && component.resource) {
            this.resourceListFilename = component.resource;
        }

        if (component) {
            this.isComponentLibrary = true;
        }
    }

    public static async resolve(location: string, resource: string) {
        const name = getPackageName(resource);
        const pkg = packages.get(name) ?? new Package(location, name);
        if (!packages.has(name)) {
            packages.set(name, pkg);
        }

        return pkg;
    }

    public getResourceConfig(path: string) {
        return PackageResourceConfig.resolve(join(path, this.resourceListFilename));
    }
}
