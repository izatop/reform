import {join} from "path";
import {getPackageName} from "../internal";

const packages = new Map<string, Package>();

export class Package {
    public readonly name: string;
    public readonly path: string;
    public readonly config: Record<string, any>;
    public readonly isComponentLibrary: boolean;

    constructor(path: string, name: string) {
        this.name = name;
        this.path = path;
        this.config = require(join(path, "package.json"));
        this.isComponentLibrary = this.config.component ?? false;
    }

    public static async resolve(location: string, resource: string) {
        const name = getPackageName(resource);
        const pkg = packages.get(name) ?? new Package(join(location, name), name);
        if (!packages.has(name)) {
            packages.set(name, pkg);
        }

        return pkg;
    }
}
