import * as React from "react";
import {calcClasses} from "../../helpers";

export interface ITabElementProps {
    children: React.ReactNode;
    active?: boolean;
}

export const TabsElement: React.FC<ITabElementProps> = (props) => (
    <li className={calcClasses(props, {is: ["active"]})}>{props.children}</li>
);

TabsElement.displayName = "TabsElement";
