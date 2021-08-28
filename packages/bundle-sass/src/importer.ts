import {assert, resolveThrough} from "@reform/bundle";
import {dirname, join} from "path";
import {basename} from "path/posix";

function resolveUrl(initiator: string, url: string): string {
    if (url.startsWith("~")) {
        const normalized = url.substr(1);
        const filePath = dirname(normalized);
        const fileName = basename(normalized);
        const modulePath = resolveThrough(initiator, join("node_modules", filePath));

        assert(modulePath, `Cannot resolve ${url} at ${initiator}`);
        return join(modulePath, fileName);
    }

    return url;
}

function importer(url: string, prev: string) {
    return {file: resolveUrl(dirname(prev), url)};
}

export default importer;
