import React from "react";
import {calcClasses} from "../../helpers";
import {SectionOptions, SectionProps} from "./props";

export const Section: React.FunctionComponent<SectionProps> = (props) => {
    return <section className={calcClasses(props, SectionOptions)}>{props.children}</section>;
};
