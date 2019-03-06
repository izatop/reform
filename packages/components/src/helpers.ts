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

/**
 * @private
 * @param types
 * @param props
 * @param suffix
 */
const getClasses = (types: {[key: string]: Array<ICalcResolver | string>}, props: IProps, suffix = "") => {
    const classes = [];
    for (const [prefix, modifiers] of Object.entries(types)) {
        for (const item of modifiers) {
            if (typeof item === "string" && Reflect.has(props, item)) {
                const value = Reflect.get(props, item);

                if (typeof value === "string") {
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
                                .map((name) => `${prefix}-${name}${suffix}`),
                        );
                    }
                }
            }
        }
    }

    return classes;
};

/**
 * @private
 * @param props
 * @param name
 * @param responsive
 * @param are
 * @param has
 * @param is
 */
export const calcClasses = (props: IProps, {name, responsive, are, has, is}: ICalcOptions = {}) => {
    const classes = [];

    const types = {are: are || [], has: has || [], is: is || []};
    classes.push(...getClasses(types, props));

    if (name) {
        classes.push(name);
    }

    if (responsive) {
        for (const device of Object.keys(Breakpoint)) {
            classes.push(...getClasses(
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
};

/**
 * @private
 * @param props
 * @param options
 */
export const calcProps = (props: IProps, options: ICalcOptions) => {
    return {
        className: calcClasses(props, options),
        ...(props.props || {}),
    };
};

const mergePropsAllow = ["className"];

/**
 * @private
 * @param props
 */
export const mergeProps = (...props: IProps[]) => {
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
};
