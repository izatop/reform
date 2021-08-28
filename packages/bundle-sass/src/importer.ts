import {resolveThrough} from "@reform/bundle";

function resolveUrl(url: string) {
    if (url.startsWith("~")) {
        return resolveThrough("node_modules", url.substr(1));
    }

    return url;
}

function importer(url: string) {
    return {file: resolveUrl(url)};
}

export default importer;
