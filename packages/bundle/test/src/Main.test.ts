import {exit, isPluginCtor, load} from "../../src";
import {TestPlugin} from "./plugin/TestPlugin";
import {resolve} from "path";
import {BuildContext} from "../../src/build/BuildContext";
import {getArgumentList} from "../../src/internal";

test("Main Test", async () => {
    const id = resolve(__dirname, "plugin/TestPlugin");
    const ctx = new BuildContext(id, getArgumentList(), __dirname + "/src", __dirname + "/build");
    expect(isPluginCtor(TestPlugin)).toBe(true);
    expect(load(id, ctx, {})).toMatchSnapshot();
    exit(0);
});
