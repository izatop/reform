import * as React from "react";
import {Input} from "./Input";

export class Phone<P = {}> extends Input<P> {
    protected type = "tel";
}
