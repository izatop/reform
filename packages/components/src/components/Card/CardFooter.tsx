import * as React from "react";
import {renderCardChild} from "./props";

export interface ICardFooterProps {
    children: React.ReactElement[] | React.ReactElement;
}

const itemProps = {
    className: "card-footer-item",
};

export const CardFooter: React.FC<ICardFooterProps> = (props) => {
    const children = React.Children.toArray(props.children);
    return (
        <footer className={"card-footer"}>
            {children.map((child, key) => (
                renderCardChild({...itemProps, key}, child)
            ))}
        </footer>
    );
};

CardFooter.displayName = "CardFooter";
