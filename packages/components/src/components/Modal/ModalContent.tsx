import * as React from "react";
import {Helpers} from "../../helpers";
import {ModalContentOptions, ModalContentProps} from "./props";

export const ModalContent: React.FC<ModalContentProps> = (props) => (
    <div className={Helpers.calcClasses(props, ModalContentOptions)}>{props.children}</div>
);

ModalContent.displayName = "ModalContent";
