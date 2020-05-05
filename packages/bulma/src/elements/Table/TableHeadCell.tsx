import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({displayName: "TableHeadCell"});
export const TableHeadCell = config.factory<MakeProps, XProps<"th">>(({props, children}) => (
    <th {...props}>{children}</th>
));
