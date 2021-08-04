import {basename} from "path";
import {getResourcePath, isPackageResource} from "../internal";
import {Package} from "./Package";
import {PackageResourceConfig} from "./PackageResourceConfig";

const byPath = new Map<string, PackageComponent>();
const byResource = new Map<string, PackageComponent>();

export class PackageComponent {
    public readonly package: Package;
    public readonly resources: PackageResourceConfig;
    public readonly component: string;
    public readonly path: string;

    constructor(pkg: Package, path: string, resources: PackageResourceConfig) {
        this.path = path;
        this.package = pkg;
        this.resources = resources;
        this.component = basename(path);
    }

    public static async resolve(resource: string) {
        if (isPackageResource(resource) && !byResource.has(resource)) {
            const path = getResourcePath(resource);
            const pkg = await Package.resolve(path, resource);
            if (pkg.isComponentLibrary) {
                const packageComponent = new PackageComponent(pkg, path, pkg.getResourceConfig(path));
                byResource.set(resource, packageComponent);
                byPath.set(path, packageComponent);
            }
        }

        return null;
    }

    public static getResources() {
        return [...byResource.values()]
            .map(({resources}) => resources.getResourcesBy("sass"))
            .flat();
    }
}
