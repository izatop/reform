import {ok} from "assert";
import {createReadStream, promises as fs} from "fs";
import * as http from "http";
import * as path from "path";
import {URL} from "url";
import {BuildAbstract, BundleScript} from "../build";
import {IArgumentList, log} from "../internal";
import logger from "../internal/logger";
import {BuildServerHandle} from "./interfaces";

export class BuildServer extends BuildAbstract {
    constructor(args: IArgumentList, bundleConfigList: BundleScript[]) {
        super(args, bundleConfigList);
    }

    public async before(): Promise<void> {
        const serverList = new Map<number, BuildServerHandle>();
        const getHandlesFor = (port: number) => {
            const handles = serverList.get(port) ?? this.createServerHandle(port);
            if (!serverList.has(port)) {
                serverList.set(port, handles);
            }

            return handles;
        };

        for (const bundleConfig of this.bundleScriptList) {
            const {config: {serve = {port: 8080}, build}} = bundleConfig;
            const listen = getHandlesFor(serve.port);
            listen(serve.host, async (pathname: string) => {
                let resource = path.join(build, pathname);
                try {
                    const stat = await fs.stat(resource);
                    ok(stat.isFile(), "Not found");
                } catch (error) {
                    resource = path.join(bundleConfig.config.build, "index.html");
                }

                logger.log("serve", resource);
                return {path: resource};
            });
        }
    }

    public after(): Promise<void> {
        return Promise.resolve(undefined);
    }

    private createServerHandle(port: number): BuildServerHandle {
        const types = new Map([
            [".js", "text/javascript"],
            [".css", "text/css"],
            [".html", "text/html"],
            [".js.map", "application/json"],
        ]);

        const handles = new Map<string, (resource: string) => Promise<{ path: string }>>();
        const server = http.createServer(async (req, res) => {
            try {
                const {host: headerHost = "localhost"} = req.headers;
                const protocol = "http";

                log("[%s://%s] HTTP %s %s", protocol, headerHost, req.method, req.url);

                const {hostname: vhost, pathname} = new URL(req.url ?? "", `${protocol}://${headerHost}`);
                const handle = handles.get(vhost);
                ok(handle, "Host not found");
                ok(typeof req.url === "string", "Not found");

                const result = await handle(pathname);
                const type = types.get(path.extname(result.path)) ?? "text/plain";
                res.setHeader("content-type", type);
                createReadStream(result.path).pipe(res);
            } catch (error) {
                logger.error(error);
                res.statusCode = 404;
                res.statusMessage = error.message;
                res.end(error.message);
            }
        });

        server.listen(port, () => logger.log("serve on %d", port));

        return (vhost = "localhost", handle) => {
            logger.log("add { vhost: %s }", vhost);
            handles.set(vhost, handle);
            return () => server.close();
        };
    }
}
