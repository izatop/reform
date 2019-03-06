import * as React from "react";
import {calcClasses} from "../../helpers";
import {PanelOptions, PanelProps} from "./props";

export const Panel: React.FunctionComponent<PanelProps> = (props) => (
    <div className={calcClasses(props, PanelOptions)}>
        {props.children}
    </div>
);
