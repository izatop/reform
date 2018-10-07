import * as React from "react";

export interface ITildaProps {
    children: string;
}

export const Tilda: React.StatelessComponent<ITildaProps> = (props) => (
    <span className={"tilda"}>{props.children}</span>
);
