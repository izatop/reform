import "./index.scss";
import {render} from "react-dom";
import {Hello} from "./page/Hello";

render(
    <Hello/>,
    document.getElementById("app"),
);
