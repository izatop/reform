import {resolve} from "path";

import {Directory, exit, isPluginCtor, load, PluginAbstract} from "../../src";
import {BuildContext} from "../../src/build/BuildContext";
import {getArgumentList} from "../../src/internal";
import {TestPlugin} from "./plugin/TestPlugin";

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

    expect(isPluginCtor(TestPlugin)).toBe(true);
    expect(load(id, ctx, {})).toBeInstanceOf(PluginAbstract);
    exit(0);
});
