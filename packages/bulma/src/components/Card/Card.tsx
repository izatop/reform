import {ReactElement} from "react";
import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface ICardProps extends XProps<"div"> {
    children: ReactElement | ReactElement[];
}

const config = ConfigFactory.create({component: "card"});
export const Card = config.factory<MakeProps, ICardProps>(({props, children}) => (
    <div {...props}>{children}</div>
));
