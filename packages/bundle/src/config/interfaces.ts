import {IBundleConfig} from "../build";

export interface IPluginList {
    "@reform/bundle-font": {
        filter: RegExp;
    };
    "@reform/bundle-sass": {
        filter: string;
        compress?: RegExp;
    };
    "@reform/bundle-graphql": {
        filter: RegExp;
    };
}

export interface IJSONBundle extends IBundleConfig {
    plugins?: Partial<IPluginList>;
    preset?: string;
    files?: string[];
}

export interface IJSONSchema {
    preset?: Record<string, IJSONBundle>;
    bundle: IJSONBundle[];
}
