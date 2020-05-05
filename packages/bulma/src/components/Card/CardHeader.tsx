import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface ICardHeader extends XProps<"header"> {
    children?: React.ReactElement | [React.ReactElement, React.ReactElement];
}

const config = ElementFactory.create({component: "card-header"});
export const CardHeader = config.factory<MakeProps, XProps<"header"> & ICardHeader>(({props, children}) => {
    return (
        <header {...props}>
            {children}
        </header>
    );
});
