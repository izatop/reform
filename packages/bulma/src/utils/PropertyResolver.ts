import {IInProps, IProps} from "../type";

export class PropertyResolver {
    public static resolve<P extends IInProps, O>(input: P, mutations: { [key: string]: string } = {}) {
        const props: IProps = {};
        const options: IProps = {};
        const modifiers: IProps = {};
        const {children, ...p} = input;
        for (const [from, to] of Object.entries(mutations)) {
            if (Reflect.has(p, from) && !Reflect.has(p, to) && typeof Reflect.get(p, from) !== "undefined") {
                Reflect.set(p, to, true);
            }
        }

        for (const [property, value] of Object.entries(p)) {
            props[property] = value;
            if (typeof value === "undefined") {
                continue;
            }

            modifiers[property] = value;
            options[property] = value;
        }

        return {
            children,
            modifiers,
            options: options as O,
            props: props as P,
        };
    }
}
