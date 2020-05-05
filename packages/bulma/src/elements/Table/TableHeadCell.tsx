import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({displayName: "TableHeadCell"});
export const TableHeadCell = config.factory<MakeProps, XProps<"th">>(({props, children}) => (
    <th {...props}>{children}</th>
));
