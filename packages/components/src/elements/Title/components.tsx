import * as React from "react";
import {createTitle} from "./props";

export const Title = createTitle("title", 3, () => <h3/>);
export const Title1 = createTitle("title", 1, () => <h1/>);
export const Title2 = createTitle("title", 2, () => <h2/>);
export const Title3 = createTitle("title", 3, () => <h3/>);
export const Title4 = createTitle("title", 4, () => <h4/>);
export const Title5 = createTitle("title", 5, () => <h5/>);
export const Title6 = createTitle("title", 6, () => <h6/>);

export const Subtitle = createTitle("subtitle", 5, () => <h5/>);
export const Subtitle1 = createTitle("subtitle", 1, () => <h1/>);
export const Subtitle2 = createTitle("subtitle", 2, () => <h2/>);
export const Subtitle3 = createTitle("subtitle", 3, () => <h3/>);
export const Subtitle4 = createTitle("subtitle", 4, () => <h4/>);
export const Subtitle5 = createTitle("subtitle", 5, () => <h5/>);
export const Subtitle6 = createTitle("subtitle", 6, () => <h6/>);
