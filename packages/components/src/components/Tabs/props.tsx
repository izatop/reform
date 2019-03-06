import {ReactElement} from "react";
import {MakeProps} from "../../interfaces";

export const TabsOptions = {
    name: "tabs",
};

export type TabsProps = MakeProps<{
    children: ReactElement | ReactElement[];
}>;
