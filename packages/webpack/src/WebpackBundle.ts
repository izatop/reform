import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {default as path, dirname, join} from "path";
import webpack from "webpack";
import {Bundle, IWebpackValue, Loaders, Options} from "webpack-bundle";
import {WebpackOptimizations} from "./WebpackOptimizations";

export class WebpackBundle extends Bundle {
    constructor(context: NodeModule) {
        const mode = (process.env.NODE_ENV || "development") as IWebpackValue<"mode">;
        super(
            new Options.Mode(mode),
            new Options.Context(join(dirname(context.filename), "src")),
            new Options.Entry({index: "index"}),
            new Options.Resolve({
                extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".sass"],
                modules: ["node_modules", join(dirname(context.filename), "src")],
            }),
            new Options.Output({
                path: join(dirname(context.filename), "dist/"),
                publicPath: "/",
                filename: "js/[name].js?[hash:6]",
                chunkFilename: "js/[name].js?[chunkhash:6]",
            }),
            new Options.Module([
                new Loaders.SassLoader({
                    test: /\.(css|sass|scss)/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                }),
                new Loaders.TypeScriptLoader({
                    options: {
                        transpileOnly: mode === "development",
                        compilerOptions: {
                            module: "esnext",
                            moduleResolution: "node",
                        },
                    },
                }),
                new Loaders.FileLoader({}),
                new Loaders.HtmlLoader({}),
            ]),
            new Options.ResolveLoader({
                modules: [
                    `${join(__dirname, "../../node_modules")}`,
                    `${join(__dirname, "../../../node_modules")}`,
                    `${join(__dirname, "../../../../node_modules")}`,
                    "node_modules",
                ],
            }),
            new WebpackOptimizations(),
        );

        const sourcePath = join(dirname(context.filename), "src");
        const routesPaths = [
            [join(sourcePath, "application/routes/"), "~/?"],
            [join(sourcePath, "authorization"), "authorization"],
            [join(sourcePath, "application"), "~/index"],
            [join(sourcePath, "components"), "public"],
            [join(sourcePath, "vendor"), "public"],
            [join(sourcePath, "store"), "public"],
        ];

        const mapPathToRoute = (p: string) => {
            const match = routesPaths.find(([route]) => p.includes(route));
            if (match) {
                const [route, target] = match;
                return target
                    .replace(
                        "?",
                        p
                            .replace(/(\/index)?\..+$/, "")
                            .replace(route, ""),
                    );
            }

            return undefined;
        };

        const plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({template: "index.html"}),
            new MiniCssExtractPlugin({filename: "assets/css/[name].css?[chunkhash:6]"}),
            new webpack.NamedChunksPlugin((chunk) => {
                if (chunk.name) {
                    return chunk.name;
                }

                return [...chunk._modules]
                    .map((m) => (
                            mapPathToRoute(
                                path.resolve(m.context, m.userRequest))
                        ),
                    )
                    .filter((v) => !!v)
                    .shift();
            }),
        ];

        this.set(new Options.DevServer({
            contentBase: path.join(dirname(context.filename), "dist"),
            historyApiFallback: true,
            compress: true,
            port: 9000,
            hot: true,
        }));

        this.set(new Options.Plugins(plugins));
    }
}
