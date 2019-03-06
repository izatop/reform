import * as React from "react";
import {ClientConnection} from "./ClientConnection";

export const ClientContext = React.createContext(ClientConnection.get());
