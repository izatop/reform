import {BuildAbstract} from "./BuildAbstract";

export class BuildScript extends BuildAbstract {
    public after(): Promise<void> {
        return Promise.resolve(undefined);
    }

    public before(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
