import * as p5 from "parse5";
import * as TreeAdapter from "parse5/lib/tree-adapters/default";
import {isElement, isParentNode, isTextNode} from "../functions";

const getNodeDeep = (node: p5.Node, start = 0): number => {
    if (isElement(node) && node.parentNode) {
        return getNodeDeep(node.parentNode, start + 1);
    }

    return start > 1 ? start - 1 : 0;
};

const createIndent = (node: p5.ParentNode, deep: number): p5.TextNode => {
    return {
        nodeName: "#text",
        parentNode: node,
        value: " ".repeat(deep * 2),
    };
};

const createLineBreak = (node: p5.ParentNode): p5.TextNode => {
    return {
        nodeName: "#text",
        parentNode: node,
        value: "\n",
    };
};

const trimTextNode = (node: p5.TextNode): p5.TextNode => {
    return {
        ...node,
        value: node.value.trim(),
    };
};

const indentChild = (parent: p5.ParentNode, child: p5.ChildNode, deep: number) => {
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
    ...TreeAdapter,
    getChildNodes: (node: p5.Node) => {
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

        return TreeAdapter.getChildNodes(node);
    },
};
