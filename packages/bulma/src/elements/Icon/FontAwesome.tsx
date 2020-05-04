import * as React from "react";
import {IProps} from "../../type";
import {IIcon} from "./Icon";

export const FontAwesome: React.FC<IIcon> = (props) => {
    const classes = ["fas", `fa-${props.icon}`];
    const options: IProps = {};

    if (props["icon-weight"]) {
        classes.push(`fa-${props["icon-weight"]}`);
    }

    if (props["icon-rotate"]) {
        Reflect.set(options, "data-fa-transform", `rotate-${props["icon-rotate"]}`);
    }

    if (props["icon-flip"]) {
        Reflect.set(options, "data-fa-transform", `flip-${props["icon-flip"]}`);
    }

    return <i {...options} className={classes.join(" ")}/>;
};
