import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({displayName: "TableCell"});
export const TableCell = config.factory<MakeProps, XProps<"td">>(({props, children}) => (
    <td {...props}>{children}</td>
));
