import {ITableRow, TextAlignType, XProps} from "@reform/components";
import * as React from "react";
import {ITableSource} from "./props";

export interface ITableStoreProperty<T extends ITableSource> {
    name: keyof T & string;
    key: string | number;
    align?: TextAlignType;
    title?: React.ReactNode;
    total?: (data: T[]) => React.ReactNode;
    render?: (row: T) => React.ReactNode;
}

export interface ITableStoreRow<T extends ITableSource> {
    property: ITableStoreProperty<T>;
    value?: React.ReactNode;
    key: string | number;
}

/* tslint:disable:callable-types */
export interface ITableStoreRender<T extends ITableSource> {
    (key: string, data: T): React.ReactNode;
}

export class TableStore<T extends ITableSource> {
    public properties: Array<ITableStoreProperty<T>> = [];

    public primary: string = "id";

    public rowProps?: (data: T) => ITableRow & XProps<"tr">;

    public data: T[];

    constructor(data: T[]) {
        this.data = data;
    }

    public header(fn: (key: string | number, title: React.ReactNode, p: ITableStoreProperty<T>) => React.ReactNode) {
        return this.properties.map((property) => fn(property.key, property.title, property));
    }

    public footer(fn: (key: string | number, title: React.ReactNode, p: ITableStoreProperty<T>) => React.ReactNode) {
        return this.properties.map((property) => fn(
            property.key,
            property.total ? property.total(this.data) : null,
            property,
        ));
    }

    public fetchKey(data: T) {
        return data[this.primary];
    }

    public fetchRow(data: T) {
        return this.properties.map((property) => ({
            property,
            key: property.key,
            value: property.render ?
                property.render(data)
                : data[property.name],
        }));
    }

    public map(fn: ITableStoreRender<T>) {
        return this.data.map((data) => fn(
            this.fetchKey(data),
            data,
        ));
    }
}
