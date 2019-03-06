import {WebpackBundle} from "@reform/webpack";

const bundle = new WebpackBundle(module);
export default bundle.getWebpackConfig();
