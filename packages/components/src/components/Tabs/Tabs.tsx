import * as React from "react";
import {Helpers} from "../../helpers";
import {TabsOptions, TabsProps} from "./props";
import {TabsElement} from "./TabsElement";

export const Tabs: React.FunctionComponent<TabsProps> = (props) => (
    <div className={Helpers.calcClasses(props, TabsOptions)}>
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
