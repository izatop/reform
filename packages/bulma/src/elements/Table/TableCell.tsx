import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({displayName: "TableCell"});
export const TableCell = config.factory<MakeProps, XProps<"td">>(({props, children}) => (
    <td {...props}>{children}</td>
));
