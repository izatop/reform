import * as React from "react";

export const ComponentsRoute = React.lazy(() => import("./routes/components"));
export const ElementsRoute = React.lazy(() => import("./routes/elements"));
export const FormsRoute = React.lazy(() => import("./routes/forms"));
export const FormsControlledRoute = React.lazy(() => import("./routes/forms/controlled"));
export const TablesRoute = React.lazy(() => import("./routes/tables"));
