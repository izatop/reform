import {Breakpoint} from "./enum";

/**
 * @private
 */
export interface ICalcResolver {
    [key: string]: (value: any) => string | string[] | undefined;
}

/**
 * @private
 */
export interface ICalcOptions {
    name?: string;
    responsive?: boolean;
    are?: Array<ICalcResolver | string>;
    has?: Array<ICalcResolver | string>;
    is?: Array<ICalcResolver | string>;
    props?: string[];
}

/**
 * @private
 */
export interface IProps {
    [key: string]: any;
}

const mergePropsAllow = ["className"];

export class Helpers {
    public static getClasses(types: {[key: string]: Array<ICalcResolver | string>}, props: IProps, suffix = "") {
        const classes = [];
        for (const [prefix, modifiers] of Object.entries(types)) {
            for (const item of modifiers) {
                if (typeof item === "string" && Reflect.has(props, item)) {
                    const value = Reflect.get(props, item);

                    if (typeof value === "string" && value) {
                        classes.push(`${prefix}-${value}${suffix}`);
                    } else if (typeof value === "boolean" && value) {
                        classes.push(`${prefix}-${item.toLowerCase()}${suffix}`);
                    }

                    continue;
                }

                if (typeof item === "object") {
                    for (const [key, resolve] of Object.entries(item)) {
                        if (Reflect.has(props, key)) {
                            const result = resolve(Reflect.get(props, key));
                            classes.push(
                                ...(Array.isArray(result) ? result : [result])
                                    .filter((value) => !!value)
                                    .map((name) => `${prefix}-${name}${suffix}`),
                            );
                        }
                    }
                }
            }
        }

        return classes;
    }

    public static calcClasses(props: IProps, options: ICalcOptions = {}) {
        const classes = [];

        const types = {
            are: options.are || [],
            has: options.has || [],
            is: options.is || [],
        };

        classes.push(...Helpers.getClasses(types, props));

        if (options.name) {
            classes.push(options.name);
        }

        if (options.responsive) {
            for (const device of Object.keys(Breakpoint)) {
                classes.push(...Helpers.getClasses(
                    types,
                    Reflect.get(props, device) || {},
                    `-${device}`,
                ));
            }
        }

        if (Reflect.has(props, "className")) {
            classes.push(Reflect.get(props, "className"));
        }

        return classes
            .filter((className) => !!className)
            .join(" ");
    }

    public static calcProps(props: IProps, options: ICalcOptions) {
        return {
            className: Helpers.calcClasses(props, options),
            ...(props.props || {}),
        };
    }

    public static mergeProps(...props: IProps[]) {
        const newProps: any = {};
        for (const part of props) {
            for (const [key, value] of Object.entries(part)) {
                newProps[key] = value;
            }
        }

        for (const key of mergePropsAllow) {
            newProps[key] = "";
            for (const part of props) {
                if (key in part) {
                    newProps[key] = newProps[key].concat(" ", part[key]);
                }
            }
        }

        return newProps;
    }
}
