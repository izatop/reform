import "./index.scss";
import * as React from "react";
import {render} from "react-dom";
import {Card} from "./page/Card";
import {Hello} from "./page/Hello";

render(
    <Hello><Card/></Hello>,
    document.getElementById("app"),
);
