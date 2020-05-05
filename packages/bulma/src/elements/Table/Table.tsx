import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ITable {
    fullwidth?: boolean;
    bordered?: boolean;
    striped?: boolean;
    narrow?: boolean;
    hoverable?: boolean;
}

const config = ElementFactory.create({component: "table"});
export const Table = config.factory<MakeProps<ITable>, XProps<"table">>(({props, children}) => (
    <table {...props}>{children}</table>
));
