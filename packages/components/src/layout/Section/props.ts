import {MakeProps} from "../../interfaces";

export const SectionOptions = {
    name: "section",
    is: ["size"],
};

export enum SectionSize {
    Medium = "medium",
    Large = "large",
}

export type SectionProps = MakeProps<{
    size?: SectionSize;
}>;
