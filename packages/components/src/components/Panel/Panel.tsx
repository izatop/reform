import * as React from "react";
import {Helpers} from "../../helpers";
import {PanelOptions, PanelProps} from "./props";

export const Panel: React.FunctionComponent<PanelProps> = (props) => (
    <div className={Helpers.calcClasses(props, PanelOptions)}>
        {props.children}
    </div>
);

Panel.displayName = "Panel";
