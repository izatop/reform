import * as React from "react";
import {MakeProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

interface IInput extends IsSize, IsColor {
    loading?: boolean;
    hovered?: boolean;
    focused?: boolean;
    rounded?: boolean;
    static?: boolean;
}

const config = ConfigFactory.create({component: "input"});
export const Input = config.factoryRef<"input", MakeProps<IInput>>(({props}) => (
    <input {...props}/>
));
