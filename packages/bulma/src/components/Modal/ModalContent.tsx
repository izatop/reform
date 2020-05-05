import * as React from "react";
import {ElementFactory} from "../../utils";

const config = ElementFactory.create({component: "modal-content"});
export const ModalContent = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
