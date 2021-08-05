import {Loader, Plugin, TreeShaking} from "esbuild";

export type PWAManifest = Record<string, any>;
export type SourceMapVariant = boolean | "inline" | "external" | "both";

export interface IPWAApplicationConfig {
    source?: string;
    bundle: string[];
    manifest: PWAManifest;
}

export interface IBundleConfig {
    base: string;
    build: string;
    entry: string[];
    files?: string[];
    environment?: string[];
    variables?: Record<string, string | boolean | number>;
    loader?: { [ext: string]: Loader };
    app?: IPWAApplicationConfig;
    serve?: {
        port: number;
        host?: string;
    };

    envFile?: string;

    splitting?: boolean;
    treeShaking?: true | TreeShaking;
    sourcemap?: SourceMapVariant;
}

export interface IBundleScriptConfig extends IBundleConfig {
    plugins?: Plugin[];
    splitting?: boolean;
    treeShaking?: true | TreeShaking;
}

export type BuildServerHandle = (vhost: string | undefined,
                                 handle: (resource: string) => Promise<{ path: string }>) => () => void;
