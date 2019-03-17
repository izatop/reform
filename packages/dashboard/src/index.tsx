import * as React from "react";
import * as ReactDOM from "react-dom";
import {Entry} from "./Entry";
import "./index.scss";
import {SessionContext} from "./store/context";
import {SessionState} from "./store/SessionState";

const container = document.createElement("div");
document.body.append(container);

ReactDOM.render(
    <React.StrictMode>
        <SessionContext.Provider value={SessionState}>
                <Entry/>
        </SessionContext.Provider>
    </React.StrictMode>,
    container,
);
