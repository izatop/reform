import * as React from "react";
import {PropsWithoutRef} from "react";
import {DefaultProps, IComponentConfig, IComputed, IInProps, XElement, XProps, XPropsKeys} from "../interfaces";
import {defaultResolvers} from "../props";

export type CT<T> = React.ComponentType<T>;
const responsive = ["mobile", "tablet", "touch", "desktop", "widescreen", "fullhd"];

export class ConfigFactory {
    public readonly config: IComponentConfig;

    constructor(config: IComponentConfig) {
        this.config = config;
    }

    public static getDefaultResolvers() {
        return defaultResolvers;
    }

    public static create(options: Partial<IComponentConfig>) {
        return new ConfigFactory(this.createConfig(options));
    }

    public static resolveClassName(input: any, config: IComponentConfig) {
        const classes: string[] = [];
        const {mutations, component} = config;
        const inputProps = new Map<string, any>(Object.entries(input));
        const resolvers = new Map(Object.entries(config.resolvers));

        if (inputProps.has("className")) {
            classes.push(inputProps.get("className")!);
        }

        if (component) {
            classes.push(component);
        }

        for (const [from, to] of Object.entries(mutations)) {
            if (inputProps.has(from) && !inputProps.has(to) && typeof inputProps.get(from) !== "undefined") {
                classes.push(to);
            }
        }

        for (const type of responsive) {
            if (inputProps.has(type)) {
                const adds = [];
                for (const [key, value] of Object.entries(inputProps.get(type))) {
                    const resolve = resolvers.get(key)!;
                    if (typeof resolve === "function") {
                        const res = resolve(value);
                        adds.push(...(Array.isArray(res) ? res : [res]).filter<string>((v): v is string => !!v));
                        continue;
                    }

                    adds.push(resolve);
                }

                classes.push(...adds.map((cs) => `${cs}-${type}`));
            }
        }

        for (const [key, value] of inputProps.entries()) {
            if (resolvers.has(key) && typeof value !== "undefined") {
                const resolve = resolvers.get(key)!;
                if (typeof resolve === "function") {
                    const res = resolve(value);
                    classes.push(...(Array.isArray(res) ? res : [res]).filter<string>((v): v is string => !!v));
                    continue;
                }

                classes.push(resolve);
            }
        }

        return classes.join(" ");
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

        for (const type of responsive) {
            if (inputProps.has(type)) {
                const adds = [];
                for (const [key, value] of Object.entries(inputProps.get(type))) {
                    const resolve = resolvers.get(key)!;
                    if (typeof resolve === "function") {
                        const res = resolve(value);
                        adds.push(...(Array.isArray(res) ? res : [res]).filter<string>((v): v is string => !!v));
                        continue;
                    }

                    adds.push(resolve);
                }

                classes.push(...adds.map((cs) => `${cs}-${type}`));
                inputProps.delete(type);
            }
        }

        for (const [key, value] of inputProps.entries()) {
            if (resolvers.has(key)) {
                options[key] = value;
                inputProps.delete(key);
                if (typeof value !== "undefined") {
                    const resolve = resolvers.get(key)!;
                    if (typeof resolve === "function") {
                        const res = resolve(value);
                        classes.push(...(Array.isArray(res) ? res : [res]).filter<string>((v): v is string => !!v));
                        continue;
                    }

                    classes.push(resolve);
                }
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

    public factory<OPT = {}, P = DefaultProps>(FN: CT<IComputed<P, OPT>>,
                                               defaultProps: Partial<P & OPT> = {}): React.FC<P & OPT> {
        FN.displayName = this.config.displayName;
        const container: React.FC<P & OPT> = (props) => (
            React.createElement(
                FN,
                ConfigFactory.getPropsOf<P, OPT>(props as P & OPT, this.config),
                props.children,
            )
        );

        container.displayName = `@${this.config.displayName}`;
        container.defaultProps = defaultProps;
        return container;
    }

    public factoryRef<K extends XPropsKeys,
        OPT = {},
        P = XProps<K>>(FN: CT<IComputed<P, OPT>>,
                       defaultProps: Partial<PropsWithoutRef<P & OPT>> = {}) {

        FN.displayName = this.config.displayName;
        const container = React.forwardRef<XElement<K>, P & OPT>((props, ref) => (
            React.createElement(
                FN,
                ConfigFactory.getPropsOf<P, OPT>({...props, ref} as P & OPT, this.config),
                props.children,
            )
        ));

        container.displayName = `@${this.config.displayName}`;
        container.defaultProps = defaultProps;
        return container;
    }
}
