import "./index.scss";
import {createRoot} from "react-dom/client";
import {Hello} from "./page/Hello";

const root = createRoot(document.getElementById("app")!);
root.render(<Hello/>);
