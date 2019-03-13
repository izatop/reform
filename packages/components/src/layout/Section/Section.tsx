import React from "react";
import {Helpers} from "../../helpers";
import {SectionOptions, SectionProps} from "./props";

export const Section: React.FunctionComponent<SectionProps> = (props) => {
    return <section className={Helpers.calcClasses(props, SectionOptions)}>{props.children}</section>;
};
