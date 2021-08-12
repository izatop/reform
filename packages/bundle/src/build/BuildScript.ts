import {BuildAbstract} from "./BuildAbstract";

export class BuildScript extends BuildAbstract {
    public before(): Promise<void> {
        return Promise.resolve(undefined);
    }

    public after(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
