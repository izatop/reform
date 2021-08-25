import {createReadStream, promises as fs} from "fs";
import * as http from "http";
import * as path from "path";
import {URL} from "url";
import {BuildAbstract} from "../build";
import {assert, entries, isObject, onClose} from "../internal";
import logger from "../internal/logger";
import {BuildServerHandle} from "./interfaces";
import {pathToRegexp} from "path-to-regexp";

export class BuildServer extends BuildAbstract {
    public async watch() {
        this.listen();

        return super.watch();
    }

    private listen() {
        const serverList = new Map<number, BuildServerHandle>();
        const getHandlesFor = (host: string, port: number) => {
            const handles = serverList.get(port) ?? this.createServerHandle(host, port);
            if (!serverList.has(port)) {
                serverList.set(port, handles);
            }

            return handles;
        };

        for (const bundleConfig of this.bundleScriptList) {
            const {config: {serve, build}} = bundleConfig;
            if (!serve) {
                continue;
            }

            const routes: [route: RegExp, file?: string][] = [];

            if (serve.fallback) {
                routes.push([pathToRegexp("(.+\\.[a-z0-9]+)")]);

                if (isObject(serve.fallback)) {
                    for (const [route, file] of entries(serve.fallback)) {
                        routes.push([pathToRegexp(route), file]);
                    }
                }

                if (serve.fallback === true) {
                    routes.push([pathToRegexp("/:route+"), "index.html"]);
                }
            }

            const listen = getHandlesFor(serve.host ?? "default", serve.port);
            listen(serve.host, async (route: string) => {
                const resource = build.resolve(route);
                try {
                    const stat = await fs.stat(resource);
                    assert(stat.isFile(), "Not found");
                } catch (error) {
                    for (const [re, fallback] of routes) {
                        if (re.test(route)) {
                            if (!fallback) {
                                break;
                            }

                            logger.debug(this, "fallback -> %s", fallback);

                            return {path: build.resolve(fallback)};
                        }
                    }

                    throw error;
                }

                return {path: resource};
            });
        }
    }

    private createServerHandle(host: string, port: number): BuildServerHandle {
        const types = new Map([
            [".js", "text/javascript"],
            [".css", "text/css"],
            [".html", "text/html"],
            [".js.map", "application/json"],
        ]);

        const handles = new Map<string,(resource: string) => Promise<{path: string}>>();
        const server = http.createServer(async (req, res) => {
            try {
                const {host: headerHost = "localhost"} = req.headers;
                const protocol = "http";

                logger.debug(this, "%s %s", req.method, req.url);

                const {hostname: vhost, pathname} = new URL(req.url ?? "", `${protocol}://${headerHost}`);
                const handle = handles.get(vhost);
                assert(handle, "Host not found");
                assert(typeof req.url === "string", "Not found");

                const result = await handle(pathname);
                const type = types.get(path.extname(result.path)) ?? "text/plain";
                res.setHeader("content-type", type);
                createReadStream(result.path).pipe(res);
            } catch (error) {
                logger.error(error, this, "request -> %s", error.message);

                res.statusCode = 404;
                res.statusMessage = error.message;
                res.end(error.message);
            }
        });

        server.listen(port, () => logger.info(this, "listen -> http://%s:%d", host, port));
        onClose(() => {
            logger.debug(this, "close");
            server.close();
        });

        return (vhost = "localhost", handle) => {
            logger.debug(this, "add { host: %s }", vhost);
            handles.set(vhost, handle);
        };
    }
}
