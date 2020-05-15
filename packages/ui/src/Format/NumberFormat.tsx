import * as React from "react";
import {NumberFormatContext} from "./NumberFormatContext";

interface INumberFormatProps {
    value: number | string;
}

export const NumberFormat: React.FC<INumberFormatProps> = (props) => {
    const format = React.useContext(NumberFormatContext);
    return <>{format.format(+props.value)}</>;
}
