import {
    Button,
    Checkbox,
    Color,
    Content,
    Control,
    Field,
    FileUpload,
    HField,
    HLabel,
    Input,
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
                    <Input is-color={Color.Primary} placeholder={"Primary"}/>
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
                    <Input is-rounded placeholder={"Rounded"}/>
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
                    <Input is-static defaultValue={"static"} placeholder={"Static"}/>
                </Control>
            </Field>
            <Field>
                <Label>Checkbox</Label>
                <Control>
                    <Checkbox name={"checkbox"} defaultChecked={true}>Checkbox</Checkbox>
                </Control>
            </Field>
            <Field>
                <Label is-size={Size.Medium}>Sizes</Label>
                <Control>
                    <Input name={"name"} is-size={"medium"} placeholder={"Meduim"}/>
                </Control>
            </Field>

            <br/>
            <Subtitle>Grouped</Subtitle>
            <Field is-grouped>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Normal</Button>
                </Control>
            </Field>
            <Field is-grouped={"centered"}>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Centered</Button>
                </Control>
            </Field>
            <Field is-grouped={"right"}>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Right</Button>
                </Control>
            </Field>

            <br/>
            <Subtitle>Addons</Subtitle>
            <Field has-addons>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Button</Button>
                </Control>
            </Field>
            <Field has-addons={"right"}>
                <Control>
                    <Input placeholder={"Primary"}/>
                </Control>
                <Control>
                    <Button>Button</Button>
                </Control>
            </Field>
            <Field has-addons>
                <Control is-expanded>
                    <Input placeholder={"Expanded"}/>
                </Control>
                <Control>
                    <Button is-color={Color.Primary}>Primary Button</Button>
                </Control>
            </Field>

            <hr/>

            <Subtitle>Horizontal</Subtitle>

            <HField label={"Label"}>
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
            </HField>
            <HField label={"Select"}>
                <Field>
                    <Control>
                        <Select options={["Value 1", "Value 2"]}/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Select size={2} multiple options={["Value 1", "Value 2"]}/>
                    </Control>
                </Field>
            </HField>
            <HField>
                <HLabel>TextArea</HLabel>
                <Field>
                    <Control>
                        <TextArea is-fixed placeholder={"Enter text"}/>
                    </Control>
                </Field>
            </HField>
            <HField>
                <HLabel>Radio</HLabel>
                <Field>
                    <Control>
                        <Radio name={"foo"}>Foo</Radio>
                        <Radio name={"foo"}>Bar</Radio>
                        <Radio name={"foo"}>Baz</Radio>
                    </Control>
                </Field>
            </HField>
            <HField>
                <HLabel>File</HLabel>
                <Field>
                    <Control>
                        <FileUpload files={"File.zip"} label={"Select a file"}/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <FileUpload is-boxed
                                    is-size={"normal"}
                                    is-color={"primary"}
                                    files={"Boxed File Upload.png"}
                                    label={"Select files"}
                                    multiple/>
                    </Control>
                </Field>
            </HField>
        </Content>
    </>
));
