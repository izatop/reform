import {getResourcePath} from "@reform/bundle";

function importer(file: string) {
    return {file: getResourcePath(file)};
}

export default importer;
