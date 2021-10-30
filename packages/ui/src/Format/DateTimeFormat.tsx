import * as React from "react";

interface IDateFormat {
    value: number | string | Date;
    format?: string;
}

export const DateTimeFormat: React.FC<IDateFormat> = (props) => {
    const date = new Date(props.value);
    const format = props.format || "? ?";
    const value = format.replace("?", date.toLocaleDateString())
        .replace("?", date.toLocaleTimeString());

    return <>{value}</>;
};

DateTimeFormat.defaultProps = {format: "? ?"};
