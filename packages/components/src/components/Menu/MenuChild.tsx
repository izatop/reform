import * as React from "react";
import {HTMLAttributes} from "react";
import {MenuNode} from "./Store/MenuNode";

/**
 * @private
 * @param node
 * @constructor
 */
export const MenuChild: React.FunctionComponent<{ node: MenuNode }> = ({node}) => {
    const classes = [];
    const [active, setActive] = React.useState(node.isActive());
    const handleClick = React.useCallback(() => node.enter(), [node]);
    const handleUpdate = React.useCallback(() => setActive(node.isActive()), [node]);
    React.useEffect(() => node.listen(["leave", "enter"], handleUpdate), [node]);

    if (active) {
        classes.push("is-active");
    }

    const add = {"onClick": handleClick, "data-id": node.id};

    if (React.isValidElement<HTMLAttributes<HTMLElement>>(node.node)) {
        const {props: {...newProps}} = node.node;
        if (Reflect.has(newProps, "className")) {
            classes.push(Reflect.get(newProps, "className"));
        }

        Reflect.set(newProps, "className", classes.join(" "));

        return React.cloneElement(node.node, {...newProps, ...add});
    }

    return <a {...add} className={classes.join(" ")}>{node.node}</a>;
};

MenuChild.displayName = "MenuChild";
