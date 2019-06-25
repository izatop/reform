import {Form, List, ListContainer, Map, Store} from "@reform/api";
import {Button, Buttons, Control, Field, Help, Icon, Label} from "@reform/components";
import {
    AutoComplete,
    Checkbox,
    Email,
    FilesUpload,
    FileUpload,
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

const planets = [
    {value: "Mercury"},
    {value: "Venera"},
    {value: "Earth"},
    {value: "Mars"},
    {value: "Jupiter"},
    {value: "Saturn"},
    {value: "Uran"},
    {value: "Neptun"},
];

export const FormExample: React.FC<IFormExample> = (props) => {
    const [hobbyRequired, setHobbyRequired] = React.useState(true);

    return (<>
        <Form defaultSource={props.defaultSource}
              onMount={props.onChange}
              onChange={props.onChange}>
            <Field>
                <Label>Login</Label>
                <Control state={ban} type={user}>
                    <Input autoFocus
                           placeholder={"name"}
                           autoComplete={"name"}
                           name={"name"}/>
                </Control>
                <Help>AutoFocus enabled</Help>
            </Field>

            <Field>
                <Label>Email</Label>
                <Control type={"at"} state={"check"}>
                    <Email placeholder={"Email"} name={"email"}/>
                </Control>
                <Help>Email input with default autoComplete=email</Help>
            </Field>

            <Field>
                <Label>Planet</Label>
                <Control>
                    <AutoComplete dataSource={planets}
                                  serialize={(value) => `label: ${value.value}`}
                                  placeholder={"Type planet name"}
                                  name={"planet"}/>
                </Control>
                <Help>AutoComplete control value/label pair</Help>
            </Field>

            <Field>
                <Label>Planet</Label>
                <Control>
                    <AutoComplete dataSource={planets}
                                  defaultValue={planets[2]}
                                  placeholder={"Type planet name"}
                                  name={"planet2"}/>
                </Control>
                <Help>AutoComplete with default value</Help>
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
                    <Input name={"me.hobby"}
                           placeholder={"Enter your hobby"}
                           required={hobbyRequired}/>
                </Control>
                {hobbyRequired && <Help is-color={"danger"}>Required field hobby</Help>}
            </Field>

            <Field>
                <Control>
                    <Checkbox defaultValue={hobbyRequired}
                              onUpdateValue={({value}) => setHobbyRequired(value)}
                              name={"checkbox"}>Hobby required</Checkbox>
                </Control>
            </Field>

            <Label>Select</Label>
            <Field is-grouped>
                <Control>
                    <MultipleSelect name={"multiple"} size={3} options={["foo", "bar", "baz"]}/>
                </Control>
                <Control>
                    <Select name={"select.required"} defaultValue={"B"} required
                            options={["A", {label: "b", value: "B"}, "C", "D"]}/>
                </Control>
                <Control>
                    <Select name={"select.blank"}
                            emptiness
                            options={[{label: "Blank Label", value: "blank-value"}]}/>
                </Control>
            </Field>

            <Field>
                <Label>Long text</Label>
                <Control>
                    <TextArea name={"text"} placeholder={"Enter text..."}/>
                </Control>
            </Field>

            <Field>
                <Label>File upload</Label>
                <Control>
                    <FileUpload name={"file"} placeholder={"Select file"}/>
                </Control>
            </Field>

            <Field>
                <Label>Multiple files upload</Label>
                <Control>
                    <FilesUpload fullwidth boxed color={"primary"} name={"file"} placeholder={"Select multiple file"}/>
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
                <ListContainer>
                    {(store) => (
                        <Buttons is-align={"right"}>
                            <Button onClick={() => store.add({})}>Add</Button>
                        </Buttons>
                    )}
                </ListContainer>
            </List>

            <Buttons is-align={"right"}>
                <Reset>Reset</Reset>
                <Submit>Submit</Submit>
            </Buttons>
        </Form>
    </>);
};
