import * as React from "react";
import {isValidElement, ITableSource, TableStoreContext} from "./props";
import {ITableConfig, TableConfig} from "./TableConfig";
import {ITableProperty, TableProperty} from "./TableProperty";
import {ITableRenderer, TableRenderer} from "./TableRenderer";
import {ITableStoreProperty, TableStore} from "./TableStore";

export interface ITableProvider<T extends ITableSource> {
    data: T[];
    children: [
        React.ReactElement<ITableConfig<T>>,
        React.ReactElement<ITableRenderer>?
    ];
}

export interface ITableState<T extends ITableSource = ITableSource> {
    store: TableStore<T>;
    renderer?: React.ReactElement<ITableRenderer>;
}

export interface IFactoryType<T extends ITableSource = ITableSource> {
    Factory: React.ComponentClass<ITableProvider<T>, ITableState<T>>;
    Config: React.FC<ITableConfig<T>>;
    Property: React.FC<ITableProperty<T>>;
    Renderer: React.FC<ITableRenderer>;
}

export class TableFactory<T extends ITableSource = ITableSource>
    extends React.Component<ITableProvider<T>, ITableState<T>> {
    public state: ITableState<T>;

    constructor(props: ITableProvider<T>) {
        super(props);
        this.state = {store: new TableStore(props.data)};
    }

    public static getDerivedStateFromProps(nextProps: ITableProvider<any>) {
        const state: ITableState<any> = {store: new TableStore(nextProps.data)};
        for (const child of React.Children.toArray(nextProps.children)) {
            if (isValidElement(child, TableRenderer)) {
                state.renderer = child;
                continue;
            }

            if (isValidElement(child, TableConfig)) {
                state.store.primary = child.props.primary;
                state.store.rowProps = child.props.rowProps;
                const properties: ITableStoreProperty<any>[] = [];
                for (const property of React.Children.toArray(child.props.children)) {
                    if (isValidElement(property, TableProperty)) {
                        const {props: p} = property;
                        properties.push({
                            align: property.props.align,
                            title: property.props.title,
                            name: property.props.name,
                            key: "key" in property ? property.key as any : p.name,
                            total: property.props.total,
                            render: property.props.render || property.props.children,
                        });
                    }
                }

                state.store.properties = properties;
            }
        }

        return state;
    }

    public static create<T extends ITableSource>(): IFactoryType<T> {
        return {
            Factory: this,
            Config: TableConfig,
            Property: TableProperty,
            Renderer: TableRenderer,
        };
    }

    public render() {
        const {Provider} = TableStoreContext;
        return (
            <Provider value={this.state.store}>
                {this.state.renderer}
            </Provider>
        );
    }
}
