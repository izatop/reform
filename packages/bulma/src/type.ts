import * as React from "react";
import {
    Breakpoint,
    BreakpointType,
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

export type DefaultProps = { children?: React.ReactNode };

export interface IBaseProps {
    textSize?: TextSize | TextSizeType;
    textColor?: ColorType;
    textAlign?: TextAlign | TextAlignType;
    textWeight?: TextWeight | TextWeightType;
    textTransform?: TextTransform | TextTransformType;
    fontFamily?: FontFamily | FontFamilyType;
    bg?: ColorType;
    hidden?: boolean;
    display?: "block" | "flex" | "inline" | "inline-block" | "inline-flex";
    clearfix?: boolean;
    pull?: "left" | "right";
    marginless?: boolean;
    paddingless?: boolean;
    overlay?: boolean;
    clipped?: boolean;
    radiusless?: boolean;
    shadowless?: boolean;
    isUnselectable?: boolean;
    invisible?: boolean;
    srOnly?: boolean;
    relative?: boolean;
}

export interface IBreakpoint {
    breakpoint?: BreakpointType | Breakpoint;
}

export type MakeProps<P = {}, K extends keyof P = never> = IBaseProps & P & MakeResponsive<P, K>;
export type MakeBreakpoint<P = {}, K extends keyof P = never> = MakeProps<P, K> & IBreakpoint;

export type PickComponentProps<P = {}, K extends keyof P = never> = K extends never
    ? Pick<P & IBaseProps, keyof IBaseProps>
    : Pick<P & IBaseProps, keyof IBaseProps & K>;

export type MakeResponsive<P = {}, K extends keyof P = never> = {
    [S in BreakpointType]?: PickComponentProps<P, K>;
};

export interface IPropertyResolvers {
    [key: string]: string | ((value: any) => string | string[] | undefined | false);
}

export type MakePropertyResolver<T, K extends keyof T = keyof T> = IPropertyResolvers & {
    [P in keyof T]: string | ((value: any) => string | string[] | undefined | false);
}

export interface IComponentConfig {
    component?: string;
    displayName?: string;
    resolvers: IPropertyResolvers;
    dependencies?: string[];
    mutations: { [key: string]: string };
}

export interface IInProps extends IProps {
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
