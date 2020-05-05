import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsActive} from "../../props";
import {ConfigFactory} from "../../utils";

export type TabProps = XProps<"li"> & {
    children: React.ReactNode;
};

const config = ConfigFactory.create({component: "tab"});
export const Tab = config.factory<MakeProps<IsActive>, TabProps>(({props, children}) => (
    <li {...props}>{children}</li>
));
