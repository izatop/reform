import * as React from "react";
import {Code} from "../../components/Code";
import {Tilda} from "../../components/Tilda";
import Form from "./Form";

export const UseArray: React.StatelessComponent<{ title: string }> = (props) => (
    <>
        <h3>{props.title}</h3>
        <p>Simple form with <Tilda>TextInput</Tilda> and <Tilda>NumberInput</Tilda> with <Tilda>defaultValue</Tilda>.
        </p>

        <Form/>

        <Code code={require("./Form.tsx?code")}/>
    </>
);
