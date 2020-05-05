import * as React from "react";
import {ReactElement} from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";
import {Tab} from "./Tab";

export type TabsProps = XProps<"div"> & {
    children: ReactElement | ReactElement[];
};

const config = ConfigFactory.create({component: "tabs"});
export const Tabs = config.factory<MakeProps, TabsProps>(({props, children}) => (
    <div {...props}>
        <ul>
            {React.Children.map(children, (child: React.ReactElement) => {
                if (child.type === Tab) {
                    return child;
                }

                return <Tab>{child}</Tab>;
            })}
        </ul>
    </div>
));
