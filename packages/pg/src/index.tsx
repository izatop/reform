import {Theme} from "@reform/com";
import * as React from "react";
import {Suspense} from "react";
import * as ReactDOM from "react-dom";
import Layout from "./components/Layout";

const Main = React.lazy(() => import("./pages/main"));

const container = document.createElement("div");
document.body.appendChild(container);

ReactDOM.render(
    <Theme>
        <Layout>
            <Suspense fallback={"Loading..."}>
                <Main/>
            </Suspense>
        </Layout>
    </Theme>,
    container,
);
