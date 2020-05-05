import * as React from "react";
import {Icon} from "../../elements/Icon";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface IControl {
    expanded?: boolean;
}

export interface IControlProps {
    state?: string | React.ReactElement;
    type?: string | React.ReactElement;
}

const config = ElementFactory.create({
    component: "control",
    mutations: {
        state: "has-icons-right",
        type: "has-icons-left",
    },
});

const render = (icon?: string | React.ReactElement, align?: "left" | "right") => (
    icon && (
        typeof icon === "string"
            ? <Icon icon={icon} is-align={align}/>
            : React.cloneElement(icon, {...icon.props, "is-align": align})
    )
);

export const Control = config.factory<MakeProps<IControl>, IControlProps>(
    ({props: {state, type, ...p}, children}) => (
        <div {...p}>
            {children}
            {render(type, "left")}
            {render(state, "right")}
        </div>
    ),
);
