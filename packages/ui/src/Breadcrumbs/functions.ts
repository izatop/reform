import {ReactElement, useContext} from "react";
import {BreadcrumbsContext} from "./BreadcrumbsProvider";

export function setBreadcrumb(path: string, title: string, icon?: string | ReactElement) {
    const breadcrumbs = useContext(BreadcrumbsContext);
    breadcrumbs.mount([path, title, icon]);
}
