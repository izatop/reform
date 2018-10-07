import "normalize.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/style.css";
import {Main} from "./examples/Main";

const id = document.createElement("div");
document.body.appendChild(id);

ReactDOM.render(<Main/>, id);
