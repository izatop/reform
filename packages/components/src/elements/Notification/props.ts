import {Color} from "../../enum";
import {MakeProps} from "../../interfaces";

export type NotificationProps = MakeProps<{
    color?: Color;
}>;

export const NotificationOptions = {
    name: "notification",
    is: ["color"],
};
