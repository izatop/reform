import React from "react";
import {MakeProps, XProps, XPropsKeys} from "../interfaces";
import {ConfigFactory} from "../utils";

const config = ConfigFactory.create({displayName: "div"});
type NodeAttr<K extends XPropsKeys> = XProps<K>;
type NodeProp<K extends XPropsKeys> = { as: K };
type NodeType<K extends XPropsKeys = XPropsKeys> = React.FC<MakeProps<NodeProp<K>> & NodeAttr<K>>;

export const Node: NodeType = config.factory<MakeProps<NodeProp<any>>, XProps<any>>((input) => {
    const {props: {as, ...props}, children} = input;
    return React.createElement(as || "div", {children, ...props});
});
