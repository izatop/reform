export interface IBuildPaths {
    source: string;
    path: string;
}

export interface IJSONBundle {
    entry: string;
    build: IBuildPaths;
    serve?: {
        port: number;
        host?: string;
    };
    environment?: string[];
    loader?: {
        [ext: string]: string;
    }
}

export interface IJSONConfig {
    bundle: IJSONBundle[];
}

export interface IBundleScriptConfig {
    build: IBuildPaths;
    serve?: {
        port: number;
        host?: string;
    }
    environment?: string[];
    loader?: {
        [ext: string]: string;
    }
}

export type BuildServerHandle = (vhost: string | undefined,
                                 handle: (resource: string) => Promise<{ path: string }>) => () => void;
