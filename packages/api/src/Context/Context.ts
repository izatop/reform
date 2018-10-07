import * as React from "react";
import {Store} from "../Store";
import {Iterator} from "../Store/Iterator";

const defaultValue = undefined as any;
export const Context = React.createContext<{store: Store, version: number}>(defaultValue);
export const IterableContext = React.createContext<{iterator: Iterator<any>, version: number}>(defaultValue);
