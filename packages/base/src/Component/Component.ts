import {isString, isUndefined} from "../internal";
import {IDeclareConfig, PropertyPrefixMap} from "./interfaces";
import {createComponentPrefixes, isOwnNamespace} from "./prefix";

export class Component {
    public readonly type: string;
    public readonly config: IDeclareConfig<any>;

    readonly #prefixes: PropertyPrefixMap;

    readonly #initialClassName: string[] = [];

    constructor(type: string, config: IDeclareConfig<any>) {
        this.type = type;
        this.config = config;
        this.#prefixes = createComponentPrefixes(this.config.prefixes);

        if (typeof config.component === "string") {
            this.#initialClassName.push(config.component);
        }

        if (typeof config.component === "undefined") {
            this.#initialClassName.push(type);
        }
    }

    public createClassNameArray(from?: string) {
        if (from) {
            return [from, ...this.#initialClassName];
        }

        return [...this.#initialClassName];
    }

    public getPrefix(property: string): string | undefined {
        const index = property.indexOf(":");
        const ns = property.substr(0, index);
        if (!isOwnNamespace(ns)) {
            return;
        }

        const prefix = property.substr(index + 1);
        // check is prefix translation exists
        if (this.#prefixes.has(prefix)) {
            const value = this.#prefixes.get(prefix);

            // check is prefix should be dropped
            if (isUndefined(value)) {
                return ns;
            }

            return ns.concat("-", value);
        }

        return ns.concat("-", prefix);
    }

    public getModifier(prefix: string, value: unknown): string {
        if (isString(value)) {
            return prefix.concat("-", value);
        }

        return prefix;
    }

    public getModifierList(property: string, value: unknown) {
        const prefix = this.getPrefix(property);
        if (!prefix) {
            return [];
        }

        if (Array.isArray(value)) {
            return value.map((item) => this.getModifier(prefix, item));
        }

        if (isUndefined(value) || value === false) {
            return [];
        }

        return [this.getModifier(prefix, value)];
    }
}
