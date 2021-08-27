import * as p5 from "parse5";
import * as TreeAdapter from "parse5/lib/tree-adapters/default";

export const MinifyAdapter = {
    ...TreeAdapter,
    getTextNodeContent: (textNode: p5.TextNode) => textNode.value.trim(),
};
