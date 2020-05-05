import * as React from "react";
import {ReactElement} from "react";
import {XProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export interface IMessage extends IsColor, IsSize {}

export type MessageProps = XProps<"article"> & {
    children: ReactElement | [ReactElement, ReactElement];
};

const config = ElementFactory.create({component: "message"});
export const Message = config.factory<MakeProps<IMessage>, MessageProps>(({props, children}) => (
    <article {...props}>
        {children}
    </article>
));
