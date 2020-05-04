import {Prefixes} from "../options";
import {IComponentConfig, IProps} from "../type";
import {PropertyResolver} from "./PropertyResolver";

export class ClassNameResolver {
    public static resolveClassName(input: IProps, config: IComponentConfig, suffix?: string): string {
        return this.resolve(input, config, suffix).join(" ");
    }

    public static resolve(input: IProps, config: IComponentConfig, suffix?: string): string[] {
        const classes = [];
        const {component, resolvers, mutations} = config;
        const {props, modifiers} = PropertyResolver.resolve(input, mutations);

        if ("className" in props) {
            classes.push(props.className);
        }

        if (component) {
            classes.push(component);
        }

        for (const {value, property, type} of Object.values(modifiers)) {
            if (type === Prefixes.X) {
                classes.push(...ClassNameResolver.resolve(value, {resolvers, mutations}, property));
                continue;
            }

            if (property in resolvers) {
                const result = resolvers[property](value);
                const each = Array.isArray(result) ? result : [result];

                classes.push(...each.map((v) => this.getClassOf(type, property, v)));
                continue;
            }

            classes.push(this.getClassOf(type, property, value));
        }

        if (suffix) {
            return classes.filter((name) => !!name)
                .map((name) => `${name}-${suffix}`);
        }

        return classes.filter((name) => !!name);
    }

    protected static getClassOf(type: string, property: string, value: any) {
        if (typeof value === "boolean") {
            return value ? `${type}-${property}` : undefined;
        }

        return `${type}-${value}`;
    }
}
