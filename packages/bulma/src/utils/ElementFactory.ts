import * as React from "react";
import {ComponentDefaultResolvers} from "../options";
import {DefaultProps, IComponentConfig, IComputed, IInProps, MakeProps} from "../type";
import {ClassNameResolver} from "./ClassNameResolver";
import {PropertyResolver} from "./PropertyResolver";

export type CT<T> = React.ComponentType<T>;

export class ElementFactory {
    constructor(public config: IComponentConfig) {
    }

    public static getDefaultResolvers() {
        return ComponentDefaultResolvers;
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
        const className = ClassNameResolver.resolveClassName(input, config);
        const {props, options, children} = PropertyResolver.resolve<P, O>(input, config.mutations);

        return {
            props: {
                ...props,
                className,
            },
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
        : React.ComponentType<P & EP> {
        FN.displayName = this.config.displayName;

        const container: React.ComponentType<P & EP> = (props) => (
            React.createElement(
                FN,
                ElementFactory.getPropsOf<P, EP>(props, this.config),
                props.children,
            )
        );

        container.displayName = `${this.config.displayName}@Provider`;
        container.defaultProps = defaultProps;
        return container;
    }
}
