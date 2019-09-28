import {Prefixes} from "../options";
import {IInProps, IProps} from "../type";

interface IPropertyOption {
    type: string;
    property: string;
    value: any;
}

export class PropertyResolver {
    public static prefixes: string[] = Object.values(Prefixes);

    public static resolve<P extends IInProps, O>(input: P, mutations: { [key: string]: string } = {}) {
        const props: IProps = {};
        const options: IProps = {};
        const modifiers: IProps<IPropertyOption> = {};
        const {children, ...p} = input;
        for (const [from, to] of Object.entries(mutations)) {
            if (Reflect.has(p, from) && !Reflect.has(p, to) && typeof Reflect.get(p, from) !== "undefined") {
                Reflect.set(p, to, true);
            }
        }

        for (const [key, value] of Object.entries(p)) {
            if (!key.includes("-")) {
                props[key] = value;
                continue;
            }

            const prefix: string = key.substr(0, key.indexOf("-"));
            if (!this.prefixes.includes(prefix)) {
                props[key] = value;
                continue;
            }

            if (typeof value === "undefined") {
                continue;
            }

            modifiers[key] = this.normalize(key, value);
            options[key] = value;
        }

        return {
            modifiers,
            children,
            options: options as O,
            props: props as P,
        };
    }

    public static normalize(key: string, value: any) {
        const type = key.substr(0, key.indexOf("-"));
        return {
            type,
            property: key.substr(key.indexOf("-") + 1),
            value,
        };
    }

    public static getDependenciesOf(props: IProps, deps: string[] = []) {
        const {options} = this.resolve(props);
        const dependencies = [];
        for (const key of Object.keys(options)) {
            dependencies.push(props[key]);
        }

        for (const key of deps) {
            dependencies.push(props[key]);
        }

        return dependencies;
    }
}
