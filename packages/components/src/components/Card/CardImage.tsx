import * as React from "react";

export interface ICardImageProps {
    children: React.ReactElement;
}

export const CardImage: React.FC<ICardImageProps> = (props) => (
    <div className={"card-image"}>{props.children}</div>
);

CardImage.displayName = "CardImage";
