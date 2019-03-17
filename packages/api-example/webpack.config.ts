import HTMLPlugin from "html-webpack-plugin";
import {resolve} from "path";

const path = (...paths: string[]) => resolve(__dirname, ...paths);
const config = {
    mode: "development",
    entry: path("src/index.tsx"),
    output: {
        path: path("dist"),
        filename: "[name].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /.*\.tsx?$/,
                include: [path("src")],
                oneOf: [
                    {
                        resourceQuery: /code/,
                        use: "raw-loader",
                    },
                    {
                        use: "ts-loader",
                    },
                ],

            },
            {
                test: /.*\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"],
        modules: [path("src"), path("../node_modules"), "node_modules"],
    },
    devServer: {
        contentBase: path("dist"),
        historyApiFallback: true,
        compress: true,
        port: 9000,
    },
    plugins: [new HTMLPlugin({title: "@reform/api | React Form API"})],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /\/node_modules\//,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
    },
};

export default config;
