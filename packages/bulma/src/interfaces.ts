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

export type IHTMLElementRegistry = JSX.IntrinsicElements;

export type XPropsKeys = keyof IHTMLElementRegistry;
export type XProps<K extends XPropsKeys> = IHTMLElementRegistry[K];
export type DefaultProps = { children?: React.ReactNode };
export type XElement<K extends XPropsKeys> = IHTMLElementRegistry[K] extends React.DetailedHTMLProps<any, infer H>
    ? H
    : IHTMLElementRegistry[K] extends React.SVGProps<infer S> ? S : never;

export interface IBreakpoint {
    breakpoint?: BreakpointType | Breakpoint;
}

export type BaseProps = {
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
    selectable?: boolean;
    invisible?: boolean;
    srOnly?: boolean;
    relative?: boolean;
};

export type MakeProps<P = {}> = BaseProps & P;
export type MakeBreakpoint<P = {}> = MakeProps<P> & IBreakpoint;

export type PickProps<P = {}, K extends keyof P = never> = K extends never
    ? Pick<P & BaseProps, keyof BaseProps>
    : Pick<P & BaseProps, keyof BaseProps & K>;

export type MakeResponsive<P = {}, K extends keyof P = never> = {
    [S in BreakpointType]?: PickProps<P, K>;
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

export interface IProps<T = any> {
    [key: string]: T;
}

export interface IInProps extends IProps {
    children?: React.ReactNode;
}

export interface IComputed<P extends { children?: React.ReactNode }, O extends {}> {
    props: Pick<P, Exclude<keyof P, "children">> & { className?: string };
    children: P["children"];
    options: O;
}
