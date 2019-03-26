import * as React from "react";
import {ColorType, SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {FontAwesome} from "./FontAwesome";

export type IconWeight = "lg" | "2x" | "3x";

export interface IIcon {
    "icon"?: string;
    "icon-weight"?: IconWeight;
    "icon-flip"?: "v" | "h";
    "icon-rotate"?: number;
}

export interface IIconInput {
    "is-size"?: SizeType;
    "is-align"?: "right" | "left";
    "is-right"?: boolean;
    "is-left"?: boolean;
    "has-color"?: ColorType;
}

const config = ElementFactory.create({
    component: "icon",
    resolvers: {
        color: (v) => `text-${v}`,
    },
});

export type IconProps = MakeProps<IIconInput>;

export const Icon = config.factory<IconProps, IIcon>(({props: {className, ...props}, children}) => (
    <>
        <span className={className}><FontAwesome {...props}/></span>
        {React.Children.count(children) > 0 && <span>children</span>}
    </>
));
