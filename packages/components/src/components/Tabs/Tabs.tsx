import * as React from "react";
import {calcClasses} from "../../helpers";
import {TabsOptions, TabsProps} from "./props";
import {TabsElement} from "./TabsElement";

export const Tabs: React.FunctionComponent<TabsProps> = (props) => (
    <div className={calcClasses(props, TabsOptions)}>
        <ul>
            {React.Children.map(props.children, (child: React.ReactElement) => {
                if (child.type === TabsElement) {
                    return child;
                }

                return <TabsElement>{child}</TabsElement>;
            })}
        </ul>
    </div>
);
