import {defaultTreeAdapter} from "parse5";
import {NodeType} from "parse5/dist/tree-adapters/default";
import {isElement, isParentNode, isTextNode} from "../functions";
import {P5Pick} from "../p5";

const getNodeDeep = (node: P5Pick<"node">, start = 0): number => {
    if (isElement(node) && node.parentNode) {
        return getNodeDeep(node.parentNode, start + 1);
    }

    return start > 1 ? start - 1 : 0;
};

const createIndent = (node: P5Pick<"parentNode">, deep: number): P5Pick<"textNode"> => {
    return {
        nodeName: "#text" as NodeType.Text,
        parentNode: node,
        value: " ".repeat(deep * 2),
    };
};

const createLineBreak = (node: P5Pick<"parentNode">): P5Pick<"textNode"> => {
    return {
        nodeName: "#text" as NodeType.Text,
        parentNode: node,
        value: "\n",
    };
};

const trimTextNode = (node: P5Pick<"textNode">): P5Pick<"textNode"> => {
    return {
        ...node,
        value: node.value.trim(),
    };
};

const indentChild = (parent: P5Pick<"parentNode">, child: P5Pick<"childNode">, deep: number) => {
    if (isElement(child)) {
        return [
            createIndent(parent, deep),
            child,
            createLineBreak(parent),
            createIndent(parent, deep),
        ];
    }

    if (isTextNode(child)) {
        return trimTextNode(child);
    }

    return child;
};

export const PrettyAdapter = {
    ...defaultTreeAdapter,
    getChildNodes: (node: P5Pick<"parentNode">) => {
        if (isParentNode(node) && node.childNodes.length > 1) {
            const deep = getNodeDeep(node);
            const {childNodes} = node;

            return [
                createLineBreak(node),
                ...childNodes
                    .map((child) => indentChild(node, child, deep))
                    .flat(),
            ];
        }

        return defaultTreeAdapter.getChildNodes(node);
    },
};