import {Form, List, ListContext, Map, Store} from "@reform/api";
import {Button, Buttons, Control, Field, Help, Icon, Label} from "@reform/components";
import {
    Checkbox,
    Email,
    Input,
    MultipleSelect,
    NonIdealState,
    Numeric,
    Reset,
    Select,
    Submit,
    TextArea,
} from "@reform/pro";
import * as React from "react";

interface IFormExample {
    defaultSource: { [key: string]: any };
    onChange: (data: Store) => void;
}

const ban = <Icon has-color={"danger"} icon={"ban"}/>;
const user = <Icon has-color={"primary"} icon={"user"}/>;

export const FormExample: React.FC<IFormExample> = (props) => (
    <>
        <Form defaultSource={props.defaultSource}
              onMount={props.onChange}
              onChange={props.onChange}>
            <Field>
                <Label>Login</Label>
                <Control state={ban} type={user}>
                    <Input placeholder={"name"} autoComplete={"name"} name={"name"}/>
                </Control>
            </Field>

            <Field>
                <Label>Email</Label>
                <Control type={"at"} state={"check"}>
                    <Email placeholder={"Email"} name={"email"}/>
                </Control>
                <Help>Email input with default autoComplete=email</Help>
            </Field>

            <Field>
                <Label>Age</Label>
                <Control>
                    <Numeric required name={"age"}/>
                </Control>
            </Field>

            <Field>
                <Label>Default Value</Label>
                <Control>
                    <Numeric defaultValue={123} name={"defaultValue"}/>
                </Control>
                <Help>A default value marks input as changed</Help>
            </Field>

            <Field>
                <Label>Hobby</Label>
                <Control>
                    <Input name={"me.hobby"} placeholder={"Enter your hobby"} required/>
                </Control>
                <Help is-color={"danger"}>Required field hobby</Help>
            </Field>

            <Field>
                <Control>
                    <Checkbox name={"checkbox"}>Checkbox</Checkbox>
                </Control>
            </Field>

            <Label>Select</Label>
            <Field is-grouped>
                <Control>
                    <MultipleSelect name={"multiple"} size={3} options={[1, 2, 5]}/>
                </Control>
                <Control>
                    <Select name={"select"} options={[1, 2, 3]}/>
                </Control>
            </Field>

            <Field>
                <Label>Long text</Label>
                <Control>
                    <TextArea name={"text"} placeholder={"Enter text..."}/>
                </Control>
            </Field>

            <Label>Address</Label>
            <List name={"address"}>
                <List.NonIdealState>
                    <NonIdealState icon={"ban"} title={"Empty"}>No data available</NonIdealState>
                </List.NonIdealState>
                <List.IdealState>
                    <p>You can add or remove items from this list.</p>
                </List.IdealState>

                <Map.Context>
                    {(store, h) => (
                        <Field is-grouped>
                            <Control is-expanded>
                                <Input required name={"city"}/>
                            </Control>
                            <Control>
                                <Input required name={"address"}/>
                            </Control>
                            <Control is-expanded>
                                <Input required name={"house"}/>
                            </Control>
                            <Control is-expanded>
                                <Button onClick={h.delete}>
                                    <Icon icon={"trash-alt"}/>
                                </Button>
                            </Control>
                        </Field>
                    )}
                </Map.Context>
                <ListContext>
                    {(store) => (
                        <Buttons is-align={"right"}>
                            <Button onClick={() => store.add({})}>Add</Button>
                        </Buttons>
                    )}
                </ListContext>
            </List>

            <Buttons is-align={"right"}>
                <Reset>Reset</Reset>
                <Submit>Submit</Submit>
            </Buttons>
        </Form>
    </>
);