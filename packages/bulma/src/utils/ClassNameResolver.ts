import {Breakpoint} from "../options";
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

        const responsive = new Set(Object.keys(Breakpoint));
        for (const {value, property} of Object.values(modifiers)) {
            if (responsive.has(property)) {
                classes.push(...ClassNameResolver.resolve(value, {resolvers, mutations}, property));
                continue;
            }

            if (property in resolvers) {
                const resolver = resolvers[property];
                if (typeof resolver === "function") {
                    const result = resolver(value);
                    classes.push(...(Array.isArray(result) ? result : [result]));
                } else {
                    classes.push(resolver);
                }
            }
        }

        if (suffix) {
            return classes.filter((name) => !!name)
                .map((name) => `${name}-${suffix}`);
        }

        return classes.filter((name) => !!name);
    }
}
