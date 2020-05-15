import {createContext} from "react";

const numberFormat = new Intl.NumberFormat(
    "ru",
    {
        currency: "RUB",
        style: "currency",
    },
);

export const MoneyFormatContext = createContext(numberFormat);
