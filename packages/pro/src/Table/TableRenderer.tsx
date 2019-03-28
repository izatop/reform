import {
    ITable,
    Table,
    TableBody,
    TableCell,
    TableFoot,
    TableHead,
    TableHeadCell,
    TableRow,
    XProps,
} from "@reform/components";
import * as React from "react";
import {ITableSource, TableStoreContext} from "./props";

const {Consumer} = TableStoreContext;

export interface ITableRenderer<T extends ITableSource> extends ITable, XProps<"table"> {
    footer?: boolean;
    header?: boolean;
}

export const TableRenderer: React.FC<ITableRenderer<any>> = (props) => {
    const {footer, header, ...p} = props;
    return (
        <Consumer>
            {(store) => (
                <Table {...p}>
                    {header && (
                        <TableHead>
                            <TableRow>
                                {store.header((key, title, {align}) => (
                                    <TableHeadCell has-text-align={align} key={key}>{title}</TableHeadCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {store.map((key, data) => (
                            <TableRow key={key} {...(store.rowProps ? store.rowProps(data) : {})}>
                                {store.fetchRow(data).map(({key: k, property, value}) => (
                                    <TableCell has-text-align={property.align} key={k}>{value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    {footer && (
                        <TableFoot>
                            <TableRow>
                                {store.footer((key, value, {align}) => (
                                    <TableCell has-text-align={align} key={key}>{value}</TableCell>
                                ))}
                            </TableRow>
                        </TableFoot>
                    )}
                </Table>
            )}
        </Consumer>
    );
};

TableRenderer.defaultProps = {header: true};

export {ITable};
