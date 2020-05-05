import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

export interface ITextArea extends IsSize, IsColor {
    fixed?: boolean;
    loading?: boolean;
    hovered?: boolean;
    focused?: boolean;
    rounded?: boolean;
    static?: boolean;
    fullwidth?: boolean;
}

const config = ConfigFactory.create({
    component: "textarea",
    resolvers: {fixed: (v) => v && "is-fixed-size"},
});

export const TextArea = config.factory<MakeProps<ITextArea>, XProps<"textarea">>(({props, children}) => (
    <textarea {...props}>{children}</textarea>
));
