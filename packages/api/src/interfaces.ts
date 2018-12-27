import * as React from "react";
import {Element, IFormSource, IMountOptions, Store} from "./Store";

export type FormOnSubmit<T extends IFormSource> = (data: T, store: Store<T>) => boolean | Promise<boolean>;
export type FormOnChange<T extends IFormSource> = (store: Store<T>) => void | Promise<void>;
export type FormChildren<T, P = any> = React.ReactNode
    | React.ReactElement<{ store: Store<T> } | P>;

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

export interface IComponentProps<T = any> {
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

export type IElementType<E extends Element<T>, T extends IFormSource = IFormSource> = new
    (context: Store<T>, value: any, options?: IMountOptions) => E;
