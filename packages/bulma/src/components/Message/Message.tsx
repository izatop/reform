import * as React from "react";
import {ReactElement} from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

export interface IMessage extends IsColor, IsSize {}

export type MessageProps = XProps<"article"> & {
    children: ReactElement | [ReactElement, ReactElement];
};

const config = ConfigFactory.create({component: "message"});
export const Message = config.factory<MakeProps<IMessage>, MessageProps>(({props, children}) => (
    <article {...props}>
        {children}
    </article>
));
