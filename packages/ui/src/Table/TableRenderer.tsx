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
} from "@reform/bulma";
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
                                    <TableHeadCell textAlign={align} key={key}>{title}</TableHeadCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    )}
                    {footer && (
                        <TableFoot>
                            <TableRow>
                                {store.footer((key, value, {align}) => (
                                    <TableHeadCell textAlign={align} key={key}>{value}</TableHeadCell>
                                ))}
                            </TableRow>
                        </TableFoot>
                    )}
                    <TableBody>
                        {store.map((key, data) => (
                            <TableRow key={key} {...(store.rowProps?.(data) ?? {})}>
                                {store.fetchRow(data).map(({key: k, property, value}) => (
                                    <TableCell textAlign={property.align} key={k}>{value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Consumer>
    );
};

TableRenderer.defaultProps = {header: true};

export {ITable};
