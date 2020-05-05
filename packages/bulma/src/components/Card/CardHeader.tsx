import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface ICardHeader extends XProps<"header"> {
    children?: React.ReactElement | [React.ReactElement, React.ReactElement];
}

const config = ConfigFactory.create({component: "card-header"});
export const CardHeader = config.factory<MakeProps, XProps<"header"> & ICardHeader>(({props, children}) => {
    return (
        <header {...props}>
            {children}
        </header>
    );
});
