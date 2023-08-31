import "./index.scss";

import {createRoot} from "react-dom/client";

import {Hello} from "./page/Hello";

const app = document.getElementById("app");
if (app) {
    const root = createRoot(app);
    root.render(<Hello/>);
}
