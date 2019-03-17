import * as React from "react";

export interface ICardContentProps {
    children: React.ReactNode;
}

export const CardContent: React.FC<ICardContentProps> = (props) => (
    <div className={"card-content"}>{props.children}</div>
);

CardContent.displayName = "CardContent";
