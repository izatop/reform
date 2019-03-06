import {ReactElement} from "react";
import {Color, Size} from "../../enum";
import {MakeProps} from "../../interfaces";

export const MessageOptions = {
    name: "message",
    is: ["color", "size"],
};

export type MessageProps = MakeProps<{
    color?: Color;
    size?: Size;
    children: ReactElement<MessageContentProps> |
        [ReactElement<MessageHeaderProps>, ReactElement<MessageContentProps>];
}>;

export const MessageHeaderOptions = {
    name: "message-header",
};

export type MessageHeaderProps = MakeProps;

export const MessageContentOptions = {
    name: "message-body",
};

export type MessageContentProps = MakeProps;
