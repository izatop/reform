import {TextArea as TextAreaComponent} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";
import {Input} from "../Input";

export class TextArea<P = {}> extends Input<P> {
    public render() {
        const props = this.createProps<HTMLTextAreaElement>({
            onChange: (e) => this.update(e.target.value),
        });

        return (
            <TextAreaComponent {...this.getControlProps()}
                               props={props}/>
        );
    }
}
