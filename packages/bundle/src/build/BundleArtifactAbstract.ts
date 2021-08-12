import {BuildResult} from "esbuild";
import {BundleScript} from "./BundleScript";

export abstract class BundleArtifactAbstract {
    public get name() {
        return this.constructor.name;
    }

    public abstract prepare(bundleScript: BundleScript): Promise<void>;

    public abstract commit(bundleScript: BundleScript, result: BuildResult): Promise<void>;
}
