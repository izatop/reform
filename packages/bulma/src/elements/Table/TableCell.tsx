import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({displayName: "TableCell"});
export const TableCell = config.factory<MakeProps, XProps<"td">>(({props, children}) => (
    <td {...props}>{children}</td>
));
