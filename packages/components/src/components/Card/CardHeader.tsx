import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ICardHeader {
    children?: React.ReactElement | [React.ReactElement, React.ReactElement];
}

export type CardHeaderProps = XProps<"header"> & ICardHeader;

const config = ElementFactory.create({component: "card-header"});

export const CardHeader = config.factory<MakeProps, CardHeaderProps>(({props, children}) => {
    return (
        <header {...props}>
            {children}
        </header>
    );
});
