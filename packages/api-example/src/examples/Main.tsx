import * as React from "react";
import {Tilda} from "../components/Tilda";
import {SimpleForm} from "./SimpleForm/SimpleForm";
import {UseArray} from "./UseArray/UseArray";
import {WriteComponents} from "./WriteComponents/WriteComponents";

export class Main extends React.Component {
    public state = {disable: 0};

    public render() {
        const examples = [
            {
                id: "0",
                name: "Simple Form",
                render: (title: string) => <SimpleForm title={title}/>,
            },
            {
                id: "1",
                name: "Using List in forms",
                render: (title: string) => <UseArray title={title}/>,
            },
            {
                id: "2",
                name: "Write Form components",
                render: (title: string) => <WriteComponents title={title}/>,
            },
        ]

        return <>
            <h1 className={"title"}>@reform/api</h1>

            <div className={"section"}>
                <h2>Examples</h2>
                <p>Using <Tilda>@reform/api</Tilda> to build controlled simple and powerful forms.</p>
                <ul>
                    {examples.map((item) => (
                        <li key={item.name}><a href={`#${item.id}`}>{item.name}</a></li>
                    ))}
                </ul>
            </div>

            {examples.map((item) => (
                <div key={item.name}>
                    <hr/>

                    <div className={"section"} id={item.id}>
                        {item.render(item.name)}
                    </div>
                </div>
            ))}
        </>;
    }
}
