import * as React from "react";
import {Icon} from "../../elements/Icon";
import {Size} from "../../enum";
import {Helpers} from "../../helpers";
import {BreadcrumbPath, BreadcrumbsOptions, BreadcrumbsProps} from "./props";

export const renderIcon = (name?: string | null) => {
    if (!name) {
        return null;
    }

    return <Icon name={name} size={Size.Small}/>;
};

export const renderNode = (path: BreadcrumbPath, index: number, array: BreadcrumbPath[]) => {
    const props = {key: index, className: ""};
    if (array.length - 1 === index) {
        props.className = "is-active";
    }

    if (Array.isArray(path)) {
        const [uri, children, icon = null] = path;
        return (
            <li {...props}>
                <a href={uri}>
                    {renderIcon(icon)}
                    <span>{children}</span>
                </a>
            </li>
        );
    }

    if (React.isValidElement(path)) {
        return <li {...props}>{path}</li>;
    }

    return <li {...props}><a>{path}</a></li>;
};

/**
 * Two ways to use: as the "paths" prop or direct as children.
 *
 * @param props
 * @constructor
 */
export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = (props) => {
    const childrenCount = React.Children.count(props.children);
    return (
        <nav className={Helpers.calcClasses(props, BreadcrumbsOptions)} aria-label={"breadcrumbs"}>
            <ul>{props.paths
                ? props.paths.map(renderNode)
                : React.Children.map(props.children, (child, key) => (
                    <li className={key + 1 === childrenCount ? "is-active" : ""} key={key}>{child}</li>
                ))
            }</ul>
        </nav>
    );
};
