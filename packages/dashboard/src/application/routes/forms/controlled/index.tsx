import {Store} from "@reform/api";
import {Content, Title, Title1, Title4} from "@reform/components";
import * as React from "react";
import {createRouteComponent} from "../../../../vendor/createRouteComponent";
import {FormExample} from "./FormExample";

export default createRouteComponent(class extends React.Component {
    public state = {};

    private defaultSource = {
        name: "Name",
        age: 32,
        address: [
            {city: "City", address: "My Address", house: 12},
        ],
        dirty: "alien",
    };

    public render() {
        return (
            <>
                <Title1>Forms</Title1>
                <Content>
                    <Title>Controlled</Title>

                    <FormExample defaultSource={this.defaultSource}
                                 onChange={this.onChange}/>

                    <Title4>Output</Title4>
                    <pre>
                        {JSON.stringify(this.state, null, "  ")}
                    </pre>
                </Content>
            </>
        );
    }

    private onChange = (data: Store) => {
        this.setState({valid: data.valid, changed: data.changed, data: data.toObject()});
    }
});
