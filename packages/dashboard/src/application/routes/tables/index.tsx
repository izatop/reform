import {Content, Subtitle, Title, Title1} from "@reform/components";
import {TableFactory} from "@reform/pro";
import * as React from "react";
import {createRouteComponent} from "../../../vendor/createRouteComponent";
import {data} from "./data";

export default createRouteComponent(() => {
    const i = Intl.NumberFormat();
    const {Factory, Config, Property, Renderer} = TableFactory.create(data);

    return (
        <>
            <Title1>Tables</Title1>

            <Content>
                <Title>Usage</Title>
            </Content>

            <Factory data={data}>
                <Config primary={"index"} rowProps={({index}) => (index === 2 ? {"is-selected": true} : {})}>
                    <Property key={"col1"} name={"index"} title={"ID"}/>
                    <Property key={"col2"} name={"name"} title={"Name"}/>
                    <Property name={"email"}
                              title={"Email"}
                              render={({email}) => <a href={`mailto:${email}`}>{email}</a>}/>
                    <Property name={"age"} title={"Age"}/>
                    <Property name={"gender"} title={<abbr title={"Gender"}>Ge</abbr>}/>
                    <Property name={"balance"}
                              title={"Balance"}
                              align={"right"}
                              total={(rows) => `$ ${i.format(rows.reduce((l, r) => l + r.balance, 0))}`}>
                        {({balance}) => `$ ${i.format(balance)}`}
                    </Property>
                    <Property name={"isActive"}>{(v) => v ? "Yes" : "No"}</Property>
                </Config>
                <Renderer is-hoverable is-fullwidth footer/>
            </Factory>

            <Subtitle>Example</Subtitle>
            <pre>
                {`const i = new Intl.NumberFormat();
const {Factory, Config, Property, Renderer} = TableFactory.create(data); // type bindings
return (
    <Factory data={data}>
        <Config primary={"index"}>
            <Property key={"col1"} name={"index"} title={"ID"}/>
            <Property key={"col2"} name={"name"} title={"Name"}/>
            <Property name={"email"}
                      title={"Email"}
                      render={({email}) => <a href={\`mailto:\${email}\`}>{email}</a>}/>
            <Property name={"age"} title={"Age"}/>
            <Property name={"gender"} title={<abbr title={"Gender"}>Ge</abbr>}/>
            <Property name={"balance"}
                      title={"Balance"}
                      align={"right"}
                      total={(rows) => \`$ \${i.format(rows.reduce((l, r) => l + r.balance, 0))}\`}>
                {({balance}) => \`$ \${i.format(balance)}\`}
            </Property>
            <Property name={"isActive"}>{(v) => v ? "Yes" : "No"}</Property>
        </Config>
        <Renderer footer/>
    </Factory>
)
                `}
            </pre>

            <br/>

            <Subtitle>Data source</Subtitle>
            <p>Example type of a <code>data</code> array:</p>
            <br/>
            <pre>
                {JSON.stringify(data[0], null, "  ")}
            </pre>
        </>
    );
});
