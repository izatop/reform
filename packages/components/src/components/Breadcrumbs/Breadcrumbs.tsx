import * as React from "react";
import {Helpers} from "../../helpers";
import {Icon} from "../../elements/Icon";
import {Size} from "../../enum";
import {BreadcrumbPath, BreadcrumbsOptions, BreadcrumbsProps} from "./props";

export const renderIcon = (name?: string | null) => {
    if (!name) {
        return null;
    }

    return <Icon name={name} size={Size.Small}/>;
};

export const renderPath = (path: BreadcrumbPath, index: number, array: BreadcrumbPath[]) => {
    const [uri, node, icon = null] = (Array.isArray(path) ? path : ["#", path]);
    if (array.length - 1 === index) {
        return (
            <li key={index} className={"is-active"}>
                <a href={uri} aria-current={"page"}>
                    {renderIcon(icon)}
                    <span>{node}</span>
                </a>
            </li>
        );
    }

    return (
        <li key={index}>
            <a href={uri}>
                {renderIcon(icon)}
                <span>{node}</span>
            </a>
        </li>
    );
};

/**
 * Two ways to use: as the "paths" prop or direct as children.
 *
 * @param props
 * @constructor
 */
export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = (props) => (
    <nav className={Helpers.calcClasses(props, BreadcrumbsOptions)} aria-label={"breadcrumbs"}>
        <ul>{props.paths
            ? props.paths.map(renderPath)
            : React.Children.map(props.children, (child, key) => (
                <li className={key + 1 === React.Children.count(props.children) ? "is-active" : ""}
                    key={key}>{child}</li>
            ))
        }</ul>
    </nav>
);
