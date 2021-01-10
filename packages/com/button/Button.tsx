import * as React from "react";

export interface IButton {
    primary?: boolean;
}

export const Button: React.FC<IButton> = (props) => (
    <button className={`button ${props.primary ? "is-primary" : ""}`}>{props.children}</button>
);
