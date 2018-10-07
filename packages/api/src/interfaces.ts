import * as React from "react";
import {IFormSource, Store} from "./Store";

export type FormOnSubmit<T extends IFormSource> = (data: T, store: Store<T>) => boolean | Promise<boolean>;
export type FormOnChange<T extends IFormSource> = (store: Store<T>) => void | Promise<void>;
export type FormChildren<T, P = any> = React.ReactNode
    | React.ReactElement<{store: Store<T>} | P>;

export interface IFormProps<T extends IFormSource> {
    name?: string;
    defaultStore?: Store<T>;
    defaultSource?: T;
    onSubmit?: FormOnSubmit<T>;
    onChange?: FormOnChange<T>;
    className?: string;
    style?: React.CSSProperties;
    children?: FormChildren<T>;
}

export type IReceiverType<P extends IReceiverProps> = React.ComponentClass<P>;
export interface IReceiverProps<T extends IFormSource = IFormSource> {
    store: Store<T>;
}

export interface IComponentProps<T = any> extends IReceiverProps {
    name: string;
    required?: boolean;
    defaultValue?: T;
}

export interface IComponentState<T = any> {
    value?: T;
    valid: boolean;
    changed: boolean;
    version: number;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
