import {BundleScript} from "./BundleScript";

export abstract class BundleArtifactAbstract {
    public readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    public abstract commit(context: BundleScript): Promise<void>;
}
