import * as React from "react";
import {ClientConnection} from "./ClientConnection";
import {ClientContext} from "./context";

const {Provider} = ClientContext;
export const ClientProvider: React.FunctionComponent = (props) => (
    <Provider value={ClientConnection.get()}>
        {props.children}
    </Provider>
);
