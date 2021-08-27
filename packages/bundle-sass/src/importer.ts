import {getResourcePath} from "@reform/bundle";

function importer(url: string) {
    return {file: getResourcePath(url)};
}

export default importer;
