import * as React from "react";
import {Helpers} from "../../helpers";
import {CardHeaderOptions, CardHeaderProps, renderCardChild} from "./props";

const iconProps = {"className": "card-header-icon", "aria-label": "more options"};
const titleProps = {className: "card-header-title"};

export const CardHeader: React.FC<CardHeaderProps> = (props) => {
    const [title, icon] = React.Children.toArray(props.children);
    return (
        <header className={Helpers.calcClasses(props, CardHeaderOptions)}>
            {renderCardChild(titleProps, title)}
            {renderCardChild(iconProps, icon)}
        </header>
    );
};

CardHeader.displayName = "CardHeader";
