import {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {Breakpoint} from "./enum";

export interface IDefaults {
    className?: string;
}

export interface IBreakpoint {
    breakpoint?: Breakpoint;
}

export type MakeProps<P = {}> = IDefaults & P;

export type MakeElementProps<P = {}, E = {}> = MakeProps<P> & {props?: E};

export type MakeBreakpointProps<P = {}> = MakeProps<P> & IBreakpoint;

export type MakeResponsive<T extends object, K extends keyof T> = T & {
    mobile?: Pick<T, K>;
    tablet?: Pick<T, K>;
    touch?: Pick<T, K>;
    desktop?: Pick<T, K>;
    widescreen?: Pick<T, K>;
    fullhd?: Pick<T, K>;
};

export type ITagButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>;
export type ITagAnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement>;
