import * as React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "panel"});
export const Panel = config.factory(({props, children}) => (
    <div {...props}>
        {children}
    </div>
));
