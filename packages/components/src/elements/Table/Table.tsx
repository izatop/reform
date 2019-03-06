import * as React from "react";
import {calcClasses} from "../../helpers";
import {TableOptions, TableProps} from "./props";

export const Table: React.FunctionComponent<TableProps> = (props) => (
    <table className={calcClasses(props, TableOptions)}>
        {props.children}
    </table>
);
