import * as React from "react";
import {Input} from "./Input";

export class Hidden<P = {}> extends Input<P> {
    protected type = "hidden";
}
