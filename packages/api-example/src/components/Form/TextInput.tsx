/* @id TextInput.tsx */

import * as React from "react";
import {BaseInput} from "./BaseInput";

export class TextInput extends BaseInput<string> {
    protected type = "text";
}
