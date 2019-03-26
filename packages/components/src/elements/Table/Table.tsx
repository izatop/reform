import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {ITable} from "./props";

const config = ElementFactory.create({component: "table"});

export const Table = config.factory<MakeProps<ITable>, XProps<"table">>(({props, children}) => (
    <table {...props}>{children}</table>
));
