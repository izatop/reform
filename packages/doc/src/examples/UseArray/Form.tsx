/* @id Form.tsx */
import {Form, List, ListContext, MapContext, Resolve} from "@reform/api";
import * as React from "react";
import {NumberInput} from "../../components/Form/NumberInput";
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
        ]
    };

    return (
        <Form defaultSource={source} onSubmit={submitForm()}>
            <h3>Form Example, using Array</h3>
            <label>
                <span>Name</span>
                <TextInput name={"recipient"} required/>
            </label>

            <h4>Products</h4>
            <List name={"products"}>
                <table>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <MapContext>
                        {(store, helper) => (
                            <tr>
                                <td><Resolve name={"name"}/></td>
                                <td>
                                    <Resolve name={"price"} render={(value) => (
                                        value > 0 ? <span>{value}&nbsp;USD</span> : "Free!"
                                    )}/>
                                </td>
                                <td>
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
                                    <Resolve name={"price"} render={(value, s) => (
                                        value > 0
                                            ? <span>{value * s.resolve("quantity")}&nbsp;USD</span>
                                            : "-"
                                    )}/>
                                </td>
                                <td>
                                    <button type={"button"} onClick={helper.delete}>-</button>
                                </td>
                            </tr>
                        )}
                    </MapContext>
                    </tbody>
                </table>
                <ListContext>
                    {(iterator) => !iterator.some((item) => item.id === 100)
                        ? <>
                            <h4>You have a gift!</h4>
                            <button type={"button"}
                                    onClick={() => iterator.persist(gift)}>Add a gift
                            </button>
                        </>
                        : <h4>You have taken the gift!</h4>
                    }
                </ListContext>
            </List>

            <footer>
                <Reset>Reset</Reset> <Submit>Submit</Submit>
            </footer>
        </Form>
    );
};
