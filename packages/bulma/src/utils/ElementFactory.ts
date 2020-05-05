import * as React from "react";
import {defaultResolvers} from "../props";
import {DefaultProps, IComponentConfig, IComputed, IInProps, MakeProps} from "../type";

export type CT<T> = React.ComponentType<T>;

export class ElementFactory {
    constructor(public config: IComponentConfig) {
    }

    public static getDefaultResolvers() {
        return defaultResolvers;
    }

    public static create(options: Partial<IComponentConfig>) {
        const config = this.createConfig(options);
        return new ElementFactory(config);
    }

    public static createConfig(options: Partial<IComponentConfig>): IComponentConfig {
        const {component, resolvers, dependencies, displayName, mutations} = options;
        return {
            component,
            displayName: this.getDisplayName({displayName, component}),
            dependencies: dependencies || [],
            mutations: mutations || {},
            resolvers: {
                ...this.getDefaultResolvers(),
                ...(resolvers || {}),
            },
        };
    }

    public static getPropsOf<P extends IInProps, O>(input: P, config: IComponentConfig): IComputed<P, O> {
        const props: any = {};
        const options: any = {};
        const classes: string[] = [];
        const {children, ...rawProps} = input;
        const {mutations, component} = config;
        const inputProps = new Map<string, any>(Object.entries(rawProps));
        const resolvers = new Map(Object.entries(config.resolvers));
        // const className = ClassNameResolver.resolveClassName(input, config);
        // const {props, options, children} = PropertyResolver.resolve<P, O>(input, config.mutations);
        for (const [from, to] of Object.entries(mutations)) {
            if (inputProps.has(from) && !inputProps.has(to) && typeof inputProps.get(from) !== "undefined") {
                classes.push(to);
            }
        }

        if (inputProps.has("className")) {
            classes.push(inputProps.get("className")!);
        }

        if (component) {
            classes.push(component);
        }

        for (const [key, value] of inputProps.entries()) {
            if (resolvers.has(key) && typeof value !== "undefined") {
                inputProps.delete(key);
                const resolve = resolvers.get(key)!;
                if (typeof resolve === "function") {
                    const res = resolve(value);
                    classes.push(...(Array.isArray(res) ? res : [res]).filter<string>((v): v is string => !!v));
                    continue;
                }

                classes.push(resolve);
                inputProps.delete(key);
            }
        }

        inputProps.set("className", classes.join(" "));

        for (const [key, value] of inputProps.entries()) {
            Reflect.set(props, key, value);
        }

        return {
            props,
            children,
            options,
        };
    }

    private static getDisplayName(parameters: { displayName?: string, component?: string }) {
        const {displayName, component} = parameters;
        if (displayName) {
            return displayName;
        }

        if (component) {
            return component.replace(/(^[a-z]|-[a-z])/g, (s) => s.toUpperCase());
        }

        return;
    }

    public factory<EP = MakeProps, P = DefaultProps>(FN: CT<IComputed<P, EP>>, defaultProps: Partial<P & EP> = {})
        : React.FC<P & EP> {
        FN.displayName = this.config.displayName;

        const container: React.ComponentType<P & EP> = (props) => (
            React.createElement(
                FN,
                ElementFactory.getPropsOf<P, EP>(props, this.config),
                props.children,
            )
        );

        container.displayName = `@${this.config.displayName}`;
        container.defaultProps = defaultProps;
        return container;
    }
}
