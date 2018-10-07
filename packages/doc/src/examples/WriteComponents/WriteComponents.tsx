import {Form} from "@reform/api";
import * as React from "react";
import {Code} from "../../components/Code";
import {TextInput} from "../../components/Form/TextInput";
import {Tilda} from "../../components/Tilda";

export const WriteComponents: React.StatelessComponent<{ title: string }> = (props) => (
    <>
        <h3>{props.title}</h3>
        <p><Tilda>BaseInput</Tilda> is a good example to show how you can write <Tilda>Form</Tilda> components.</p>

        <Code open code={require("../../components/Form/BaseInput?code")}/>

        <p>
            Now, look at <Tilda>TextInput</Tilda> component which inherit from <Tilda>BaseInput</Tilda>.
            Use HOC <Tilda>receiver</Tilda> to attach your components to the <Tilda>Context.Consumer</Tilda>.
        </p>

        <p><u>Do not use your components without <Tilda>receiver</Tilda></u>.</p>

        <Form>
            <label>
                <span>Text</span>
                <TextInput name={"name"}
                           placeholder={"TextInput placeholder..."}/>
            </label>
        </Form>

        <Code open code={require("../../components/Form/TextInput?code")}/>
    </>
);
