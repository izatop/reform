import {TreeShaking} from "esbuild";
import {IBundleConfig, SourceMapVariant} from "../build";

export interface IJSONBundle extends IBundleConfig {
    plugins?: Record<string, unknown>;
    bundle?: {
        splitting?: boolean;
        treeShaking?: true | TreeShaking;
        sourcemap?: SourceMapVariant;
    }
}

export interface IJSONConfig {
    bundle: IJSONBundle[];
}
