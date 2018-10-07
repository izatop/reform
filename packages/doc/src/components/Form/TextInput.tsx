/* @id TextInput.tsx */

import {receiver} from "@reform/api";
import * as React from "react";
import {BaseInput} from "./BaseInput";

export class TextInputComponent extends BaseInput<string> {
    protected type = "text";
}

export const TextInput = receiver(TextInputComponent);
