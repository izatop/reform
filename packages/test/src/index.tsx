import "./index.scss";
import * as React from "react";
import {render} from "react-dom";
import {Hello} from "./page/Hello";

render(
    <Hello/>,
    document.getElementById("app"),
);
