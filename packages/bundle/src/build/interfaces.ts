import {Format, Loader, Platform, Plugin} from "esbuild";
import {BuildContext} from "./BuildContext";
import {Directory, FileCopyList, FileEntryList} from "./Resources";

export type PWAManifest = Record<string, any>;
export type SourceMapVariant = boolean | "inline" | "external" | "both";

export interface IPWAApplicationConfig {
    source?: string;
    bundle: string[];
    manifest: PWAManifest;
}

export interface IBundleConfig {
    id?: string | number;
    bundle?: boolean;
    format?: Format;
    target?: string | string[];
    platform?: Platform;
    environment?: string[];
    variables?: Record<string, string | boolean | number>;
    loader?: {[ext: string]: Loader};
    app?: IPWAApplicationConfig;
    serve?: {
        port: number;
        host?: string;
        fallback?: boolean | Record<string, string>;
    };

    envFiles?: string[];

    splitting?: boolean;
    treeShaking?: boolean;
    sourcemap?: SourceMapVariant;

    inject?: string[];

    paths?: {
        asset?: string;
        chunk?: string;
        entry?: string;
    };
}

export interface IBundleScriptConfig extends IBundleConfig {
    base: Directory;
    build: Directory;
    entry: FileEntryList;
    files: FileCopyList;
    plugins: Plugin[];
}

export type BuildServerHandle = (vhost: string | undefined,
    handle: (resource: string) => Promise<{path: string}>) => void;

export type BundleArgs = {config: IBundleScriptConfig; context: BuildContext};
