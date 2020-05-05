import * as React from "react";
import {ConfigFactory} from "../../utils";

const config = ConfigFactory.create({component: "modal-content"});
export const ModalContent = config.factory(({props, children}) => (
    <div {...props}>{children}</div>
));
