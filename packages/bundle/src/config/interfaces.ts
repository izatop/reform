import {IBundleConfig} from "../build/index.js";

export interface IPluginList {
    "@reform/bundle-sass": {
        filter?: string;
        resolves?: string[];
        compress?: RegExp;
    };
    "@reform/bundle-graphql": {
        filter?: RegExp;
    };
    "@reform/bundle-html-entry": {
        filter?: RegExp;
        attach?: "stylesheet"[];
        artifacts?: string;
    };
}

export interface IJSONBundle extends IBundleConfig {
    base: string;
    build: string;
    entry: string | string[];
    plugins?: Partial<IPluginList>;
    preset?: string;
    files?: string[];
    envFiles?: string | string[];
}

export interface IJSONSchema {
    preset?: Record<string, IJSONBundle>;
    bundle: IJSONBundle[];
}
