import * as React from "react";
import {ElementIterable, Store} from "../Store";

const defaultValue: any = {};
export const FormContext = React.createContext<Store<any>>(defaultValue);
export const IterableContext = React.createContext<ElementIterable<any>>(defaultValue);
export const TestContext = React.createContext(false);
