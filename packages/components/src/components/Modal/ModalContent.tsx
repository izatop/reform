import * as React from "react";
import {calcClasses} from "../../helpers";
import {ModalContentOptions, ModalContentProps} from "./props";

export const ModalContent: React.FC<ModalContentProps> = (props) => (
    <div className={calcClasses(props, ModalContentOptions)}>{props.children}</div>
);
