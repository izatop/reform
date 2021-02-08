import * as path from "path";

function importer(file: string) {
    if (file.startsWith("~")) {
        file = path.join(path.resolve("../../node_modules"), file.replace("~", ""));
    }

    return {file};
}

export default importer;
