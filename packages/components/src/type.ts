import * as React from "react";
import {
    Breakpoint,
    BreakpointType,
    Color,
    ColorType,
    FontFamily,
    FontFamilyType,
    TextAlign,
    TextAlignType,
    TextSize,
    TextSizeType,
    TextTransform,
    TextTransformType,
    TextWeight,
    TextWeightType,
} from "./options";

export type DefaultProps = React.ClassAttributes<any>
    & React.HTMLAttributes<any>
    & { children?: React.ReactNode };

export interface IBaseProps {
    "is-text-size"?: TextSize | TextSizeType;
    "has-text-color"?: Color | ColorType;
    "has-text-align"?: TextAlign | TextAlignType;
    "has-text-weight"?: TextWeight | TextWeightType;
    "is-text-transform"?: TextTransform | TextTransformType;
    "is-font-family"?: FontFamily | FontFamilyType;
}

export interface IBreakpoint {
    "is-breakpoint"?: Breakpoint | BreakpointType;
}

export type MakeProps<P = {}, K extends keyof P = never> = IBaseProps & P & MakeResponsive<P, K>;

export type MakeBreakpoint<P = {}, K extends keyof P = never> = MakeProps<P, K> & IBreakpoint;

export type PickComponentProps<P = {}, K extends keyof P = never> = Pick<P & IBaseProps,
    K extends string ? K & keyof IBaseProps : keyof IBaseProps>;

export type MakeResponsive<P = {}, K extends keyof P = never> = {} & {
    "x-mobile"?: PickComponentProps<P, K>;
    "x-tablet"?: PickComponentProps<P, K>;
    "x-tablet-touch"?: PickComponentProps<P, K>;
    "x-desktop"?: PickComponentProps<P, K>;
    "x-widescreen"?: PickComponentProps<P, K>;
    "x-fullhd"?: PickComponentProps<P, K>;
};

/**
 * @private
 */
export interface IPropertyResolvers {
    [key: string]: (value: any) => string | string[] | number | number[] | undefined;
}

/**
 * @private
 */
export interface IComponentConfig {
    component?: string;
    displayName?: string;
    resolvers: IPropertyResolvers;
    dependencies?: string[];
    mutations: { [key: string]: string };
}

export interface InProps extends IProps {
    children?: React.ReactNode;
}

/**
 * @private
 */
export interface IComputed<P extends { children?: React.ReactNode }, O extends {}> {
    props: Pick<P, Exclude<keyof P, "children">> & { className?: string };
    children: P["children"];
    options: O;
}

export interface IProps<T = any> {
    [key: string]: T;
}
