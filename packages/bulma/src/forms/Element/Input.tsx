import * as React from "react";
import {XProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {MakeProps} from "../../type";
import {ConfigFactory} from "../../utils";

interface IInput extends IsSize, IsColor {
    loading?: boolean;
    hovered?: boolean;
    focused?: boolean;
    rounded?: boolean;
    static?: boolean;
}

const config = ConfigFactory.create({component: "input"});
export const Input = config.factory<MakeProps<IInput>, XProps<"input">>(({props}) => (
    <input {...props}/>
));
