import {DefaultConfig, Plugin, PluginConfig} from "./Plugin";

function plugin(config: PluginConfig = DefaultConfig): Plugin {
    return new Plugin(config);
}

export default plugin;
