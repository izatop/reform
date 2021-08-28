import {PluginAbstract} from "../../../src";

export class TestPlugin extends PluginAbstract {
    public readonly name = "test-plugin";

    public configure() {
        // test
    }
}

export default TestPlugin;
