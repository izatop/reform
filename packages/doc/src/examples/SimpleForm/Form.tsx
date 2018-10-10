/* @id Form.tsx */
import {Form} from "@reform/api";
import * as React from "react";
import {NumberInput} from "../../components/Form/NumberInput";
import {Reset} from "../../components/Form/Reset";
import {Submit} from "../../components/Form/Submit";
import {TextInput} from "../../components/Form/TextInput";
import {Tilda} from "../../components/Tilda";
import {submitForm} from "../../util/submitForm";

export default () => {
    const source = {
        address: {
            city: "New-York",
        },
    };

    return (
        <Form defaultSource={source} onSubmit={submitForm()}>
            <h3>Form Example</h3>
            <label>
                <span>Name</span>
                <TextInput name={"name"} required/>
                <i>Simple required <Tilda>TextInput</Tilda></i>
            </label>
            <label>
                <span>Age</span>
                <NumberInput name={"age"} defaultValue={18} required/>
                <i><Tilda>NumberInput</Tilda> uses <Tilda>defaultValue</Tilda> when source is empty</i>
            </label>
            <label>
                <span>Hobby</span>
                <TextInput name={"my.real.hobby"} placeholder={"Play games, cooking and etc..."}/>
                <i>Optional <Tilda>TextInput</Tilda> with placeholder</i>
            </label>
            <label>
                <span>City</span>
                <TextInput name={"address.city"}/>
                <i>Use dot notation in names like <Tilda>address.city</Tilda> to resolve nested properties.</i>
            </label>

            <footer>
                <Reset>Reset</Reset> <Submit>Submit</Submit>
            </footer>
        </Form>
    );
};
