import * as React from "react";
import {MoneyFormatContext} from "./MoneyFormatContext";

interface INumberFormatProps {
    value: number | string;
    sign?: string;
}

export const MoneyFormat: React.FC<INumberFormatProps> = (props) => {
    const format = React.useContext(MoneyFormatContext);
    return <>{format.format(+props.value)}</>;
};
