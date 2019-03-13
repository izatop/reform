import {Options} from "webpack-bundle";

export class WebpackOptimizations extends Options.Optimization {
    constructor() {
        super({
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    default: false,
                    vendor: {
                        chunks: "all",
                        test: (m) => /\/node_modules\//.test(m.context),
                        name: "vendor",
                    },
                },
            },
        });
    }
}
