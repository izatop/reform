import {ElementFactory} from "../../src/utils";

test("ElementFactory", () => {
    const props = {
        "className": "base-class-name",
        "is-modifier": true,
        "prop1": "value1",
    };

    const config = ElementFactory.createConfig({component: "test"});
    const computed = ElementFactory.getPropsOf(props, config);
    expect(computed)
        .toEqual({
            props: {
                className: "base-class-name test is-modifier",
                prop1: "value1",
            },
            options: {
                "is-modifier": true,
            },
        });
});
