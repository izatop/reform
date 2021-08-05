import {TreeShaking} from "esbuild";
import {IBundleConfig, SourceMapVariant} from "../build";

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
    bundle?: {
        splitting?: boolean;
        treeShaking?: true | TreeShaking;
        sourcemap?: SourceMapVariant;
    };
}

export interface IJSONConfig {
    bundle: IJSONBundle[];
}
