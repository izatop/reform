import * as React from "react";

interface IDateFormat {
    value: number | string | Date;
}

export const TimeFormat: React.FC<IDateFormat> = (props) => (
    <>{new Date(props.value).toLocaleTimeString()}</>
);
