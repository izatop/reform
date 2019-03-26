import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ITab {
    "is-active"?: boolean;
}

export type TabProps = XProps<"li"> & {
    children: React.ReactNode;
};

const config = ElementFactory.create({component: "tab"});

export const Tab = config.factory<MakeProps<ITab>, TabProps>(({props, children}) => (
    <li {...props}>{children}</li>
));
