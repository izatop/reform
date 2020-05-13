import {Breadcrumbs as BC} from "@reform/bulma";
import * as React from "react";
import {useContext} from "react";
import {BreadcrumbLink} from "./BreadcrumbLink";
import {BreadcrumbsContext} from "./BreadcrumbsProvider";

export type Breadcrumb = (path: string, children: React.ReactElement) => React.ReactElement;

export interface BreadcrumbsProps {
    children?: Breadcrumb;
}

const defaultChildRender: Breadcrumb = (path, children) => (<a href={path}>{children}</a>);

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({children = defaultChildRender}) => {
    const breadcrumbs = useContext(BreadcrumbsContext);
    const paths = breadcrumbs.usePaths();

    return (
        <BC>
            {paths.map(([path, title, icon], i) => (
                <React.Fragment key={i}>
                    {children(path, <BreadcrumbLink icon={icon} title={title}/>)}
                </React.Fragment>
            ))}
        </BC>
    );
};
