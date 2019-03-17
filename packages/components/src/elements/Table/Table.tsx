import * as React from "react";
import {Helpers} from "../../helpers";
import {TableOptions, TableProps} from "./props";

export const Table: React.FunctionComponent<TableProps> = (props) => (
    <table className={Helpers.calcClasses(props, TableOptions)}>
        {props.children}
    </table>
);

Table.displayName = "Table";
