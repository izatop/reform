import * as React from "react";
import {Code} from "../../components/Code";
import {Tilda} from "../../components/Tilda";
import Form from "./Form";

export const SimpleForm: React.StatelessComponent<{ title: string }> = (props) => (
    <>
        <h3>{props.title}</h3>
        <p>The example describes how to build simple form based
            on <Tilda>TextInput</Tilda> and <Tilda>NumberInput</Tilda>.</p>

        <Form/>

        <Code code={require("./Form?code")}/>
    </>
);
