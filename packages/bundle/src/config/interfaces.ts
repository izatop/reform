import {IBundleConfig} from "../build";

export interface IPluginList {
    "@reform/bundle-sass": {
        filter?: string;
        compress?: RegExp;
    };
    "@reform/bundle-graphql": {
        filter?: RegExp;
    };
    "@reform/bundle-html-entry": {
        filter?: RegExp;
    };
}

export interface IJSONBundle extends IBundleConfig {
    base: string;
    build: string;
    entry: string | string[];
    plugins?: Partial<IPluginList>;
    preset?: string;
    files?: string[];
}

export interface IJSONSchema {
    preset?: Record<string, IJSONBundle>;
    bundle: IJSONBundle[];
}
