import * as React from "react";
import {Icon} from "../../elements/Icon";
import {MakeProps, XProps} from "../../interfaces";
import {Size} from "../../options";
import {IsSize} from "../../props";
import {ConfigFactory} from "../../utils";
import {Breadcrumb} from "./Breadcrumb";

export type BreadcrumbsStyleType = "arrow" | "bullet" | "dot" | "succeeds";
export type BreadcrumbNode = React.ReactChild | {} | string;
export type BreadcrumbPath = [string, BreadcrumbNode, string?] | BreadcrumbNode;

export type BreadcrumbsProps = MakeProps<{
    separator?: BreadcrumbsStyleType;
    centered?: boolean;
} & IsSize<"small" | "medium" | "large">>;

export interface IBreadcrumbsAttr extends XProps<"nav"> {
    paths?: BreadcrumbPath[];
}

const config = ConfigFactory.create({
    component: "breadcrumb",
    resolvers: {
        separator: (v) => `has-${v}-separator`,
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

export const Breadcrumbs = config.factory<BreadcrumbsProps, IBreadcrumbsAttr>(({props, children}) => {
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
                    <Breadcrumb active={key === lastChild} key={key}>{child}</Breadcrumb>
                ))}
            </ul>
        </nav>
    );
});
