import {createContext} from "react";

const numberFormat = new Intl.NumberFormat(
    [...navigator.languages], {
        currency: "RUB",
        style: "currency",
    },
);

export const MoneyFormatContext = createContext(numberFormat);
