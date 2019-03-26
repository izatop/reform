import {Prefixes} from "../../src/options";
import {PropertyResolver} from "../../src/utils/PropertyResolver";

const normalizeTest = {
    "is-key": {
        type: "is",
        property: "key",
        value: 1,
    },
    "has-key": {
        type: "has",
        property: "key",
        value: 1,
    },
};

test.each(Object.entries(normalizeTest))(
    ".normalize(%s, %o)",
    (key, expected) => {
        expect(PropertyResolver.normalize(key, 1)).toEqual(expected);
    },
);

test("Utils PropertyResolver", () => {
    expect(PropertyResolver.prefixes)
        .toEqual(Object.values(Prefixes));

    const props = {
        onChange: () => void 0,
        style: {fontSize: "12px"},
        className: "my-class-name",
    };

    const xChildren = {"is-sub": 1};
    const options = {
        "x-option1": xChildren,
        "is-option2": "is-value",
    };

    const expectedModifiers = {
        "x-option1": {type: "x", property: "option1", value: xChildren},
        "is-option2": {type: "is", property: "option2", value: "is-value"},
    };

    const resolved = PropertyResolver.resolve({...props, ...options});

    expect(resolved)
        .toEqual({
            modifiers: expectedModifiers,
            options,
            props,
        });
});
