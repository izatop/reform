import * as React from "react";
import {XProps} from "../../interfaces";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

export type TitleSize = 1 | 2 | 3 | 4 | 5 | 6;

export interface ITitle {
    "is-spaced"?: boolean;
    "is-size"?: TitleSize;
}

const createTitle = (name: string, size: TitleSize) => {
    const config = ElementFactory.create({component: name});
    return config.factory<MakeProps<ITitle>, XProps<"h1">>(({props, children}) => (
        React.createElement(`h${size}`, props, children)
    ), {"is-size": size});
};

export const Title = createTitle("title", 3);
export const Title1 = createTitle("title", 1);
export const Title2 = createTitle("title", 2);
export const Title3 = createTitle("title", 3);
export const Title4 = createTitle("title", 4);
export const Title5 = createTitle("title", 5);
export const Title6 = createTitle("title", 6);

export const Subtitle = createTitle("subtitle", 5);
export const Subtitle1 = createTitle("subtitle", 1);
export const Subtitle2 = createTitle("subtitle", 2);
export const Subtitle3 = createTitle("subtitle", 3);
export const Subtitle4 = createTitle("subtitle", 4);
export const Subtitle5 = createTitle("subtitle", 5);
export const Subtitle6 = createTitle("subtitle", 6);
