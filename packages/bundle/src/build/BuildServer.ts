import {createReadStream, promises as fs} from "fs";
import * as http from "http";
import * as path from "path";
import {URL} from "url";
import {BuildAbstract, BundleScript} from "../build";
import {assert, IArgumentList, onClose} from "../internal";
import logger from "../internal/logger";
import {BuildServerHandle} from "./interfaces";

export class BuildServer extends BuildAbstract {
    constructor(args: IArgumentList, bundleScriptList: BundleScript[]) {
        super(args, bundleScriptList);
    }

    public async before(): Promise<void> {
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

            const listen = getHandlesFor(serve.host ?? "default", serve.port);
            listen(serve.host, async (pathname: string) => {
                let resource = path.join(build, pathname);
                try {
                    const stat = await fs.stat(resource);
                    assert(stat.isFile(), "Not found");
                } catch (error) {
                    resource = path.join(bundleConfig.config.build, "index.html");
                }

                logger.debug(this, "serve", resource);
                return {path: resource};
            });
        }
    }

    public after(): Promise<void> {
        return Promise.resolve(undefined);
    }

    private createServerHandle(host: string, port: number): BuildServerHandle {
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

                logger.debug(this, "[%s://%s] HTTP %s %s", protocol, headerHost, req.method, req.url);

                const {hostname: vhost, pathname} = new URL(req.url ?? "", `${protocol}://${headerHost}`);
                const handle = handles.get(vhost);
                assert(handle, "Host not found");
                assert(typeof req.url === "string", "Not found");

                const result = await handle(pathname);
                const type = types.get(path.extname(result.path)) ?? "text/plain";
                res.setHeader("content-type", type);
                createReadStream(result.path).pipe(res);
            } catch (error) {
                logger.error(this, error);
                res.statusCode = 404;
                res.statusMessage = error.message;
                res.end(error.message);
            }
        });

        server.listen(port, () => logger.debug(this, "%s listen on %d", host, port));
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
