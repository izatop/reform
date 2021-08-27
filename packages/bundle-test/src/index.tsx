import React from "react";
import {render} from "react-dom";
import "./index.scss";
import {Hello} from "./page/Hello";

render(
    <Hello/>,
    document.getElementById("app"),
);
