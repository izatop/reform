import * as React from "react";
import {Icon} from "../../elements/Icon";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

const renderIcon = (align: "right" | "left", prop: React.ReactElement | string) => (
    React.isValidElement(prop)
        ? React.cloneElement<any>(prop, {...prop.props, align})
        : <Icon align={align} name={prop as string}/>
);

export type ControlIcons = "left" | "right" | "both";

export interface IControlProps extends MakeProps {
    children: React.ReactNode;
    icons?: ControlIcons;
    type?: React.ReactElement | string;
    state?: React.ReactElement | string;
    expand?: boolean;
}

export const ControlOptions = {
    name: "control",
    is: [{expand: () => "expanded"}],
    has: [{
        icons: (v: ControlIcons) => v === "both"
            ? ["icons-left", "icons-right"]
            : `icons-${v}`,
    }],
};

export const Control: React.FC<IControlProps> = (props) => {
    const newProps: IControlProps = {...props};

    if (props.type || props.state) {
        newProps.icons = props.type && props.type
            ? "both"
            : (props.type ? "left" : "right");
    }

    const children: React.ReactNode[] = [];

    if (props.type) {
        children.push(renderIcon("left", props.type));
    }

    if (props.state) {
        children.push(renderIcon("right", props.state));
    }

    return (
        <div className={Helpers.calcClasses(newProps, ControlOptions)}>
            {props.children}
            {children.length > 0 && children[0]}
            {children.length > 1 && children[1]}
        </div>
    );
};
