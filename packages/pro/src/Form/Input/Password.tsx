import * as React from "react";
import {Input} from "./Input";

export class Password<P = {}> extends Input<P> {
    protected type = "password";
}
