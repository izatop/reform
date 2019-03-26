import * as React from "react";
import {Icon} from "../../elements/Icon";
import {Size} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {Breadcrumb} from "./Breadcrumb";

export type BreadcrumbsStyleType = "arrow" | "bullet" | "dot" | "succeeds";
export type BreadcrumbNode = React.ReactChild | {} | string;
export type BreadcrumbPath = [string, BreadcrumbNode, string?] | BreadcrumbNode;

export type BreadcrumbsProps = MakeProps<{
    "is-right"?: boolean;
    "is-centered"?: boolean;
    "has-style"?: BreadcrumbsStyleType;
    "has-separator"?: BreadcrumbsStyleType;
}>;

export interface IBreadcrumbs {
    paths?: BreadcrumbPath[];
}

const config = ElementFactory.create({
    component: "breadcrumb",
    resolvers: {
        style: (v) => `${v}-separator`,
        separator: (v) => `${v}-separator`,
    },
});

const renderIcon = (icon?: string | null | React.ReactElement) => {
    if (React.isValidElement(icon)) {
        return icon;
    }

    if (typeof icon === "string") {
        return <Icon icon={icon as string} is-size={Size.Small}/>;
    }

    return null;
};

const renderNode = (path: BreadcrumbPath) => {
    if (Array.isArray(path)) {
        const [uri, children, icon = null] = path;
        return (
            <a href={uri}>
                {renderIcon(icon)}
                <span>{children}</span>
            </a>
        );
    }

    if (React.isValidElement(path)) {
        return path;
    }

    return <a>{path}</a>;
};

/**
 * Two ways to use: as the "paths" prop or direct as children.
 *
 * @param props
 * @constructor
 */
export const Breadcrumbs = config.factory<BreadcrumbsProps, IBreadcrumbs>(({props, children}) => {
    const {paths, ...p} = props;
    const breadcrumbs = React.useMemo(() => (paths
            ? paths.map(renderNode)
            : React.Children.toArray(children)
    ), [children, props.paths]);

    const lastChild = breadcrumbs.length - 1;

    return (
        <nav aria-label={"breadcrumbs"} {...p}>
            <ul>
                {breadcrumbs.map((child, key) => (
                    <Breadcrumb is-active={key === lastChild}
                                key={key}>{child}</Breadcrumb>
                ))}
            </ul>
        </nav>
    );
});
