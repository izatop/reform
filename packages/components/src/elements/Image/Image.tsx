import * as React from "react";
import {calcClasses} from "../../helpers";
import {FigureOptions, ImageOptions, ImageProps} from "./props";

export const Image: React.FunctionComponent<ImageProps> = (props) => (
    <figure className={calcClasses(props, FigureOptions)}>
        <img src={props.src}
             alt={props.alt || props.title}
             title={props.title}
             srcSet={props.srcSet}
             className={calcClasses({rounded: props.rounded}, ImageOptions)}
             sizes={props.sizes}/>
    </figure>
);
