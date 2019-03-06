import {RouteComponentProps} from "@reach/router";
import * as React from "react";

export type Route = React.ComponentType<RouteComponentProps>;

export const ComponentsRoute = React.lazy<Route>(() => import("./components/ComponentsPage"));
export const ElementsRoute = React.lazy<Route>(() => import("./components/ElementsPage"));
export const TemplateRoute = React.lazy<Route>(() => import("./components/TemplatePage"));
