import {defaultTreeAdapter, DefaultTreeAdapterMap, TreeAdapter} from "parse5";

import {P5Pick} from "../p5.js";

export const MinifyAdapter: TreeAdapter<DefaultTreeAdapterMap> = {
    ...defaultTreeAdapter,
    getTextNodeContent: (textNode: P5Pick<"textNode">) => textNode.value.trim(),
};
