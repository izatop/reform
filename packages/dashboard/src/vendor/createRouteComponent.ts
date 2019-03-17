import {RouteComponentProps} from "@reach/router";
import * as React from "react";

export function createRouteComponent<T = {}>(fn: React.FC<T & RouteComponentProps>) {
    return fn;
}
