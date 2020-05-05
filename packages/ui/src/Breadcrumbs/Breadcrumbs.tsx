import {Breadcrumbs as BC} from "@reform/bulma";
import * as React from "react";
import {useContext} from "react";
import {BreadcrumbIcon} from "./BreadcrumbIcon";
import {BreadcrumbsContext} from "./BreadcrumbsProvider";

export type Breadcrumb = (path: string, children: React.ReactElement) => React.ReactElement;

export interface BreadcrumbsProps {
    children?: Breadcrumb;
}

const render: Breadcrumb = (path, children) => (<a href={path}>{children}</a>);

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({children = render}) => {
    const breadcrumbs = useContext(BreadcrumbsContext);
    const paths = breadcrumbs.usePaths();

    return (
        <BC>
            {paths.map(([path, title, icon], i) => (
                <React.Fragment key={i}>
                    {children(path, <><BreadcrumbIcon icon={icon}/> {title}</>)}
                </React.Fragment>
            ))}
        </BC>
    );
};
