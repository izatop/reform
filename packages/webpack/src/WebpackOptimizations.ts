import {Options} from "webpack-bundle";

export class WebpackOptimizations extends Options.Optimization {
    constructor() {
        super({
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        test: /node_modules/,
                        name: "vendor",
                        priority: 20,
                    },
                    ui: {
                        chunks: "all",
                        test: /\/@reform\/components\//,
                        name: "ui",
                        enforce: true,
                    },
                },
            },
        });
    }
}
