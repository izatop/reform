import {RouteComponentProps} from "@reach/router";
import * as React from "react";

export type Route = React.ComponentType<RouteComponentProps>;

export const ComponentsRoute = React.lazy<Route>(() => import("./routes/components"));
export const ElementsRoute = React.lazy<Route>(() => import("./routes/elements"));
export const FormsRoute = React.lazy<Route>(() => import("./routes/forms"));
// export const TemplateRoute = React.lazy<Route>(() => import("./routes/templates"));
