import {RouteComponentProps} from "@reach/router";
import * as React from "react";

type RC<F, T = {}> = F extends React.Component ? React.Component<T & RouteComponentProps>
    : React.FC<T & RouteComponentProps>;

export function createRouteComponent<F, T = {}>(fn: F): RC<F, T> {
    return fn as any;
}
