import {basename, join} from "path";
import {getPackageResourcePath, isPackageResource} from "../internal";
import {Package} from "./Package";

const byPath = new Map<string, PackageComponent>();
const byResource = new Map<string, PackageComponent>();

export class PackageComponent {
    public readonly package: Package;
    public readonly resource: string;
    public readonly component: string;
    public readonly path: string;

    constructor(pkg: Package, path: string, resource: string) {
        this.path = path;
        this.package = pkg;
        this.resource = resource;
        this.component = basename(resource);
    }

    public static async resolve(resource: string) {
        if (isPackageResource(resource) && !byResource.has(resource)) {
            const {location, path} = await getPackageResourcePath(resource);
            const pkg = await Package.resolve(location, resource);
            if (pkg.isComponentLibrary) {
                const packageResource = new PackageComponent(pkg, path, resource);
                byResource.set(resource, packageResource);
                byPath.set(path, packageResource);

                return packageResource;
            }
        }

        return null;
    }

    public getBuildPath() {
        return join(this.path, ".pack.ts");
    }
}
