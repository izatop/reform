import * as React from "react";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "panel"});
export const Panel = config.factory(({props, children}) => (
    <div {...props}>
        {children}
    </div>
));
