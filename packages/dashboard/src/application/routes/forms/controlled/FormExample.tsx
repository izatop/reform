import {Form, List, ListContext, Map, Store} from "@reform/api";
import {Button, ButtonList, Control, Field, Icon, Label} from "@reform/components";
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

export const FormExample: React.FC<IFormExample> = (props) => (
    <>
        <Form defaultSource={props.defaultSource}
              onMount={props.onChange}
              onChange={props.onChange}>
            <Field label={"Login"}>
                <Control>
                    <Input placeholder={"name"} autoComplete={"name"} name={"name"}/>
                </Control>
            </Field>

            <Field help={"Email input with default autoComplete=email"}
                   label={"Email"}>
                <Control type={"user"}>
                    <Email placeholder={"Email"} name={"email"}/>
                </Control>
            </Field>

            <Field label={"Age"}>
                <Control>
                    <Numeric required name={"age"}/>
                </Control>
            </Field>

            <Field label={"Default Value"} help={"A default value marks input as changed"}>
                <Control>
                    <Numeric defaultValue={123} name={"defaultValue"}/>
                </Control>
            </Field>

            <Field help={"Required field hobby"}
                   label={"Hobby"}>
                <Control type={"exclamation-triangle"}>
                    <Input name={"me.hobby"} placeholder={"Enter your hobby"} required/>
                </Control>
            </Field>

            <Field>
                <Control>
                    <Checkbox name={"checkbox"}>Checkbox</Checkbox>
                </Control>
            </Field>

            <Label>Select</Label>
            <Field group>
                <Control>
                    <MultipleSelect name={"multiple"} size={3} options={[1, 2, 5]}/>
                </Control>
                <Control>
                    <Select name={"select"} options={[1, 2, 3]}/>
                </Control>
            </Field>

            <Field label={"Long text"}>
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
                        <Field group>
                            <Control expand>
                                <Input required name={"city"}/>
                            </Control>
                            <Control>
                                <Input required name={"address"}/>
                            </Control>
                            <Control expand>
                                <Input required name={"house"}/>
                            </Control>
                            <Control expand>
                                <Button props={{onClick: h.delete}}>
                                    <Icon name={"trash-alt"}/>
                                </Button>
                            </Control>
                        </Field>
                    )}
                </Map.Context>
                <ListContext>
                    {(store) => (
                        <ButtonList align={"right"}>
                            <Button props={{onClick: () => store.add({})}}>Add</Button>
                        </ButtonList>
                    )}
                </ListContext>
            </List>

            <ButtonList align={"right"}>
                <Reset>Reset</Reset>
                <Submit>Submit</Submit>
            </ButtonList>
        </Form>
    </>
)
