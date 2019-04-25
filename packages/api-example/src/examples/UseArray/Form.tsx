/* @id Form.tsx */

import {Form, Has, List, Map, Not, Size, Then} from "@reform/api";
import * as React from "react";
import {NumberInput} from "../../components/Form/NumberInput";
import {Placeholder} from "../../components/Form/Placeholder";
import {Reset} from "../../components/Form/Reset";
import {Submit} from "../../components/Form/Submit";
import {TextInput} from "../../components/Form/TextInput";
import {submitForm} from "../../util/submitForm";

export default () => {
    const gift = {
        id: 100,
        name: "Special Gift",
        price: 0,
        quantity: 1,
        freeze: true,
    };

    const source = {
        recipient: "Recipient",
        products: [
            {
                id: 1,
                name: "Getting Started with React",
                price: 18,
                quantity: 1,
            },
            {
                id: 2,
                name: "React: Cross-Platform Application Development with React Native",
                price: 31,
                quantity: 1,
            },
        ],
    };

    return (
        <Form defaultSource={source} onSubmit={submitForm()}>
            <h3>Form Example, using Array</h3>
            <label>
                <span>Name</span>
                <TextInput name={"recipient"} required/>
            </label>

            <List name={"products"}>
                <List.NonIdealState>
                    <h4>Non Ideal State</h4>
                </List.NonIdealState>

                <List.IdealState>
                    <h4>List Ideal State</h4>
                    <table>
                        <thead>
                        <tr>
                            <th style={{width: "50%"}}>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <Map.Context>
                            {(store, helper) => (
                                <tr>
                                    <td><Placeholder name={"name"}/></td>
                                    <td>
                                        <Placeholder name={"price"} render={(value) => (
                                            value > 0 ? <span>{value}&nbsp;USD</span> : "Free!"
                                        )}/>
                                    </td>
                                    <td>
                                        <Has name={"freeze"}>
                                            <Then>Only one</Then>
                                            <Not><NumberInput max={10}
                                                              min={1}
                                                              style={{width: "60px"}}
                                                              name={"quantity"}
                                                              required/></Not>
                                        </Has>
                                        {store.exists("freeze")
                                            ? "Only one"
                                            : <NumberInput max={10}
                                                           min={1}
                                                           style={{width: "60px"}}
                                                           name={"quantity"}
                                                           required/>
                                        }
                                    </td>
                                    <td>
                                        <Placeholder name={"price"} render={(value, s) => (
                                            s.resolve("quantity") > 0 && value > 0
                                                ? <span>{value * s.resolve("quantity")}&nbsp;USD</span>
                                                : "-"
                                        )}/>
                                    </td>
                                    <td>
                                        <button type={"button"} onClick={helper.delete}>-</button>
                                    </td>
                                </tr>
                            )}
                        </Map.Context>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={2}>Size</td>
                            <td colSpan={3} style={{textAlign: "right"}}><Size/></td>
                        </tr>
                        </tfoot>
                    </table>
                </List.IdealState>
                <List.Context>
                    {(iterator) => !iterator.some((item) => item.id === 100)
                        ? <>
                            <p>You have a gift! <button type={"button"}
                                                        onClick={() => iterator.persist(gift)}>Add a gift
                            </button>
                            </p>
                        </>
                        : <p>You have taken the gift!</p>
                    }
                </List.Context>
            </List>

            <footer>
                <Reset>Reset</Reset> <Submit>Submit</Submit>
            </footer>
        </Form>
    );
};
