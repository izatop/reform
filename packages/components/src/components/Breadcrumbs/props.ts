import * as React from "react";
import {Align, Size} from "../../enum";
import {MakeProps} from "../../interfaces";

export enum BreadcrumbsStyle {
    Arrow = "arrow",
    Bullet = "bullet",
    Dot = "dot",
    Succeeds = "succeeds",
}

export const BreadcrumbsOptions = {
    name: "breadcrumb",
    is: ["align", "size"],
    has: [{style: (v: BreadcrumbsStyle) => `${v}-separator`}],
};

export type BreadcrumbNode = React.ReactChild | {} | string;
export type BreadcrumbPath = [string, BreadcrumbNode, string?] | BreadcrumbNode;

export type BreadcrumbsProps = MakeProps<{
    align?: Align;
    style?: BreadcrumbsStyle;
    size?: Size;
    paths?: BreadcrumbPath[];
}>;
