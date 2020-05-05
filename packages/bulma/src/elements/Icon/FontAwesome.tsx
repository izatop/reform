import * as React from "react";
import {IProps} from "../../type";
import {IIcon} from "./Icon";

const is = (expr: any, fn: () => any) => !!expr && fn();

export const FontAwesome: React.FC<IIcon> = (props) => {
    const classes = ["fas"];
    const options: IProps = {};

    if (typeof props.icon === "string") {
        classes.push(`fa-${props.icon}`);
    } else if (typeof props.icon === "object") {
        const {name, weight, flip, rotate} = props.icon;
        classes.push(`fa-${name}`);
        is(weight, () => classes.push(`fa-${weight}`));
        is(rotate, () => Reflect.set(options, "data-fa-transform", `rotate-${rotate}`));
        is(flip, () => Reflect.set(options, "data-fa-transform", `flip-${flip}`));
    }

    return <i {...options} className={classes.join(" ")}/>;
};
