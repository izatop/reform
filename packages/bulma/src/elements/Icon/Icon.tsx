import * as React from "react";
import {IsColor, IsSize} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {FontAwesome} from "./FontAwesome";

export type IconWeight = "lg" | "2x" | "3x";

export interface IIconOptions {
    name: string;
    weight?: IconWeight | string;
    flip?: "v" | "h" | string;
    rotate?: number;
}

export interface IIcon {
    "icon"?: string | IIconOptions;
}

export interface IIconInput extends IsSize, IsColor {
    right?: true;
    left?: true;
}

const config = ElementFactory.create({
    component: "icon",
    resolvers: {color: (v) => `has-text-${v}`},
});

declare const foo: MakeProps<IIconInput>

export const Icon = config.factory<MakeProps<IIconInput>, IIcon>(({props: {className, ...props}, children}) => (
    <>
        <span className={className}><FontAwesome {...props}/></span>
        {React.Children.count(children) > 0 && <span>{children}</span>}
    </>
));
