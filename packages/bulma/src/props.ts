import {BaseProps, IBreakpoint, MakePropertyResolver} from "./interfaces";
import {ColorType, SizeType} from "./options";

const make = (name: string) => (v: boolean) => v && name;

export interface IsColor<C extends ColorType = ColorType> {
    color?: C;
}

export interface IsSize<S extends SizeType = SizeType> {
    size?: S;
}

export interface IsActive {
    active?: boolean;
}

export interface AreSizes<S extends SizeType = SizeType> {
    sizes?: S;
}

export interface KnownProps {
    shadow?: boolean;
    transparent?: boolean;
    rounded?: boolean;
    narrow?: boolean;
    multiline?: boolean;
    centered?: boolean;
    vCentered?: boolean;
    left?: boolean;
    right?: boolean;
    arrowless?: boolean;
    hoverable?: boolean;
    tab?: boolean;
    up?: boolean;
    loading?: boolean;
    outlined?: boolean;
    inverted?: boolean;
    static?: boolean;
    fullwidth?: boolean;
    selected?: boolean;
    addons?: boolean;
    bordered?: boolean;
    striped?: boolean;
    fluid?: boolean;
    boxed?: boolean;
    hovered?: boolean;
    focused?: boolean;
}

export type ResolverProps = BaseProps & IsActive & IsColor & IsSize & AreSizes & KnownProps
    & IBreakpoint;

export const defaultResolvers: MakePropertyResolver<ResolverProps> = {
    textSize: (v: string) => `is-size-${v}`,
    textColor: (v: string) => `has-text-${v}`,
    textAlign: (v: string) => `has-text-${v}`,
    textWeight: (v: string) => `has-weight-${v}`,
    textTransform: (v: string) => `is-${v}`,
    fontFamily: (v: string) => `is-family-${v}`,
    color: (v: string) => `is-${v}`,
    size: (v: string) => `is-${v}`,
    sizes: (v: string) => `are-${v}`,
    bg: (v: string) => `has-background-${v}`,
    pull: (v: string) => `is-pulled-${v}`,
    display: (v: string) => `is-${v}`,
    breakpoint: (v: string) => `is-${v}`,
    up: make("is-up"),
    active: make("is-active"),
    clearfix: make("is-clearfix"),
    bordered: make("is-bordered"),
    striped: make("is-striped"),
    shadow: make("has-shadow"),
    left: make("is-left"),
    right: make("is-right"),
    tab: make("is-tab"),
    centered: make("is-centered"),
    arrowless: make("is-arrowless"),
    transparent: make("is-transparent"),
    hoverable: make("is-hoverable"),
    vCentered: make("is-vcentered"),
    multiline: make("is-multiline"),
    rounded: make("is-rounded"),
    hidden: make("is-hidden"),
    narrow: make("is-narrow"),
    marginless: make("is-marginless"),
    paddingless: make("is-paddingless"),
    radiusless: make("is-radiusless"),
    shadowless: make("is-shadowless"),
    selectable: (v) => v === false && "is-unselectable",
    invisible: make("is-invisible"),
    overlay: make("is-overlay"),
    clipped: make("is-clipped"),
    srOnly: make("is-sr-only"),
    relative: make("is-relative"),
    loading: make("is-loading"),
    outlined: make("is-outlined"),
    inverted: make("is-inverted"),
    static: make("is-static"),
    fullwidth: make("is-fullwidth"),
    selected: make("is-selected"),
    hovered: make("is-hovered"),
    focused: make("is-focused"),
    addons: make("has-addons"),
    boxed: make("is-boxed"),
    fluid: make("is-fluid"),
};
