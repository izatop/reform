import {defaultTreeAdapter} from "parse5";
import {P5Pick} from "../p5";

export const MinifyAdapter = {
    ...defaultTreeAdapter,
    getTextNodeContent: (textNode: P5Pick<"textNode">) => textNode.value.trim(),
};
