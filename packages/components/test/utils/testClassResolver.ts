import {ClassNameResolver} from "../../src/utils/ClassNameResolver";
import {ElementFactory} from "../../src/utils/ElementFactory";

test("Utils ClassResolver", () => {
    const props = {
        "className": "base-class-name",
        "is-boolean": true,
        "is-raw": "raw-value",
        "is-calculated": 1,
        "x-mobile": {"is-foo": true},
    };

    const config = ElementFactory.createConfig({
        component: "component-name",
        resolvers: {calculated: (v) => `result-${v}`},
    });

    const classes = ClassNameResolver.resolve(props, config);
    expect(classes.sort())
        .toEqual([
            "base-class-name",
            "component-name",
            "is-boolean",
            "is-raw-value",
            "is-result-1",
            "is-foo-mobile",
        ].sort());
});
