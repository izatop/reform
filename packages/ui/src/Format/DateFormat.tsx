import * as React from "react";

interface IDateFormat {
    value: number | string | Date;
}

export const DateFormat: React.FC<IDateFormat> = (props) => (
    <>{new Date(props.value).toLocaleDateString()}</>
);
