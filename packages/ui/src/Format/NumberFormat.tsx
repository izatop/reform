import React, {useContext} from "react";
import {NumberFormatContext} from "./NumberFormatContext";

interface INumberFormatProps {
    value: number | string;
}

export const NumberFormat: React.FC<INumberFormatProps> = (props) => {
    const format = useContext(NumberFormatContext);
    return <>{format.format(+props.value)}</>;
}
