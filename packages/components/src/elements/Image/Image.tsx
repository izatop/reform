import * as React from "react";
import {Helpers} from "../../helpers";
import {FigureOptions, ImageOptions, ImageProps} from "./props";

export const Image: React.FunctionComponent<ImageProps> = (props) => (
    <figure className={Helpers.calcClasses(props, FigureOptions)}>
        <img src={props.src}
             alt={props.alt || props.title}
             title={props.title}
             srcSet={props.srcSet}
             className={Helpers.calcClasses({rounded: props.rounded}, ImageOptions)}
             sizes={props.sizes}/>
    </figure>
);
