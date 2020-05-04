import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ITable {
    "is-fullwidth"?: boolean;
    "is-bordered"?: boolean;
    "is-striped"?: boolean;
    "is-narrow"?: boolean;
    "is-hoverable"?: boolean;
}

const config = ElementFactory.create({component: "table"});

export const Table = config.factory<MakeProps<ITable>, XProps<"table">>(({props, children}) => (
    <table {...props}>{children}</table>
));
