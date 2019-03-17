import {
    Button,
    Checkbox,
    Color,
    Content,
    Control,
    Field,
    FileUpload,
    Input,
    InputStyle,
    Label,
    Radio,
    Select,
    Size,
    Subtitle,
    TextArea,
    Title,
    Title1,
} from "@reform/components";
import * as React from "react";
import {createRouteComponent} from "../../../vendor/createRouteComponent";

export default createRouteComponent(() => (
    <>
        <Title1>Forms</Title1>

        <Content>
            <Title>General</Title>
            <Field>
                <Label>Text input</Label>
                <Control>
                    <Input placeholder={"Text"}/>
                </Control>
            </Field>
            <Field>
                <Label>Primary color</Label>
                <Control>
                    <Input color={Color.Primary} placeholder={"Primary"}/>
                </Control>
            </Field>
            <Field>
                <Label>Email input</Label>
                <Control>
                    <Input placeholder={"Email"} type={"email"}/>
                </Control>
            </Field>
            <Field>
                <Label>Round</Label>
                <Control>
                    <Input style={InputStyle.Round} placeholder={"Rounded"}/>
                </Control>
            </Field>
            <Field>
                <Label>Disabled</Label>
                <Control>
                    <Input placeholder={"Disabled"} disabled/>
                </Control>
            </Field>
            <Field>
                <Label>Static</Label>
                <Control>
                    <Input style={InputStyle.Static} props={{defaultValue: "static"}} placeholder={"Static"}/>
                </Control>
            </Field>
            <Field>
                <Label>Checkbox</Label>
                <Control>
                    <Checkbox props={{name: "checkbox", defaultChecked: true}}>Checkbox</Checkbox>
                </Control>
            </Field>
            <Field>
                <Label size={Size.Medium}>Sizes</Label>
                <Control>
                    <Input props={{name: "name"}} size={Size.Medium} placeholder={"Meduim"}/>
                </Control>
            </Field>

            <br/>
            <Subtitle>Grouped</Subtitle>
            <Field group>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Normal</Button>
                </Control>
            </Field>
            <Field group={"centered"}>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Centered</Button>
                </Control>
            </Field>
            <Field group={"right"}>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Right</Button>
                </Control>
            </Field>

            <br/>
            <Subtitle>Addons</Subtitle>
            <Field addons>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Button</Button>
                </Control>
            </Field>
            <Field addons>
                <Control expand>
                    <Input placeholder={"Expanded"}/>
                </Control>
                <Control>
                    <Button color={Color.Primary}>Primary Button</Button>
                </Control>
            </Field>

            <hr/>

            <Subtitle>Horizontal</Subtitle>

            <Field horizontal>
                <Label>Label</Label>
                <Field>
                    <Control>
                        <Input placeholder={"Input 1"}/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Input placeholder={"Input 2"}/>
                    </Control>
                </Field>
            </Field>
            <Field horizontal>
                <Label>Select</Label>
                <Field>
                    <Control>
                        <Select options={["Value 1", "Value 2"]}/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Select multiple={2} options={["Value 1", "Value 2"]}/>
                    </Control>
                </Field>
            </Field>
            <Field horizontal>
                <Label>TextArea</Label>
                <Field>
                    <Control>
                        <TextArea fixed placeholder={"Enter text"}/>
                    </Control>
                </Field>
            </Field>
            <Field horizontal>
                <Label>Radio</Label>
                <Field>
                    <Control>
                        <Radio props={{name: "foo"}}>Foo</Radio>
                        <Radio props={{name: "foo"}}>Bar</Radio>
                        <Radio props={{name: "foo"}}>Baz</Radio>
                    </Control>
                </Field>
            </Field>
            <Field horizontal>
                <Label>File</Label>
                <Field>
                    <Control>
                        <FileUpload name={"File.zip"}>Select file</FileUpload>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <FileUpload box name={"Boxed File Upload.png"}>Select file</FileUpload>
                    </Control>
                </Field>
            </Field>
        </Content>
    </>
));
