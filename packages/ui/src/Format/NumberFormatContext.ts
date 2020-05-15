import {createContext} from "react";

export const NumberFormatContext = createContext(new Intl.NumberFormat([...navigator.languages]));
