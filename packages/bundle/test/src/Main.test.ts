import {resolve} from "path";

import {Directory, exit, isPluginCtor, load, PluginAbstract} from "../../src";
import {BuildContext} from "../../src/build/BuildContext";
import {getArgumentList} from "../../src/internal";
import {TestPlugin} from "./plugin/TestPlugin";
import test from "node:test";
import {equal} from "assert";

const __dirname = import.meta.dirname;
test("Main Test", async () => {
    const id = resolve(__dirname, "plugin/TestPlugin");
    const ctx = new BuildContext({
        id,
        args: getArgumentList(),
        base: new Directory(__dirname, "/src"),
        build: new Directory(__dirname, "/build"),
        entries: ["index.html"],
        format: "esm",
        platform: "browser",
    });

    equal(isPluginCtor(TestPlugin), true);
    equal((await load(id, ctx, {})) instanceof PluginAbstract, true);
    exit(0);
});
