import * as React from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface IBreadcrumb {
    "is-active"?: boolean;
}

export type BreadcrumbProps = MakeProps<IBreadcrumb>;

const config = ElementFactory.create({});
export const Breadcrumb = config.factory<BreadcrumbProps>(({props, children}) => (
    <li {...props}>{children}</li>
));