import * as React from "react";
import {ElementIterable, Store} from "../Store";

const defaultValue: any = {};
export const FormContext = React.createContext<{store: Store, version: number}>(defaultValue);
export const IterableContext = React.createContext<{ iterator: ElementIterable<any>, version: number}>(defaultValue);
export const TestContext = React.createContext(false);
