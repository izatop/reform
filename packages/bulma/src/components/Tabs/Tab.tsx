import * as React from "react";
import {XProps} from "../../interfaces";
import {IsActive} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export type TabProps = XProps<"li"> & {
    children: React.ReactNode;
};

const config = ElementFactory.create({component: "tab"});
export const Tab = config.factory<MakeProps<IsActive>, TabProps>(({props, children}) => (
    <li {...props}>{children}</li>
));
