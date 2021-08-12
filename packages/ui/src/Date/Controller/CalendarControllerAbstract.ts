import {RefCallback} from "react";
import {
    CalendarInputValue,
    CalendarLinkType,
    CalendarMode,
    CalendarUpdateListener,
    CalendarValue,
    MakeCalendarProps,
} from "../interfaces";
import {CalendarLink} from "./CalendarLink";

type Ref = { link: CalendarLink; dispose: () => void };

export abstract class CalendarControllerAbstract<M extends CalendarMode> {
    public readonly mode: M;
    protected readonly links = new Map<string, Ref>();
    protected readonly refs = new WeakSet<CalendarLinkType>();
    protected current?: CalendarValue<M>;

    readonly #listeners: CalendarUpdateListener<M>[];

    constructor(props: MakeCalendarProps<Record<any, any>, M>) {
        this.mode = props.mode;
        this.#listeners = [];
        if ("defaultValue" in props && props.defaultValue) {
            this.update(this.getDefaultValue(props.defaultValue));
        }

        if ("value" in props) {
            this.update(this.getDefaultValue(props.value));
        }

        if (!this.current) {
            this.update(this.getDefaultValue());
        }
    }

    public get value() {
        return this.current;
    }

    public update(value?: CalendarValue<M>) {
        this.current = value;
        this.handleUpdate(value);
        this.#listeners.forEach((fn) => fn(value as any));
    }

    public createRef(date: Date): RefCallback<CalendarLinkType> {
        return (ref: CalendarLinkType) => {
            if (!ref || this.refs.has(ref)) {
                return;
            }

            const link = new CalendarLink(this, date, ref);
            const handleMouseEnter = () => this.handleMouseEnter(link);
            const handleMouseLeave = () => this.handleMouseLeave(link);
            const handleClick = () => this.handleClick(link);
            ref.addEventListener("mouseenter", handleMouseEnter);
            ref.addEventListener("mouseleave", handleMouseLeave);
            ref.addEventListener("click", handleClick);

            const key = date.toLocaleDateString();
            const dispose = () => {
                ref.removeEventListener("mouseenter", handleMouseEnter);
                ref.removeEventListener("mouseleave", handleMouseLeave);
                ref.removeEventListener("click", handleClick);
                link.dispose();
                this.links.delete(key);
                this.refs.delete(ref);
            };

            this.refs.add(ref);
            this.links.set(key, {link, dispose});
            this.handleLink(link);
        };
    }

    public listen(listener: CalendarUpdateListener<M>) {
        this.#listeners.push(listener);
        return () => {
            this.#listeners.splice(this.#listeners.indexOf(listener), 1);
        };
    }

    public dispose() {
        this.#listeners.length = 0;
        for (const {dispose} of this.links.values()) {
            dispose();
        }
    }

    protected handleMouseEnter(/* eslint-disable */ link: CalendarLink) {
        // default implementation
    }

    protected handleMouseLeave(/* eslint-disable */ link: CalendarLink) {
        // default implementation
    }

    protected handleUpdate(/* eslint-disable */ value?: CalendarValue<M>) {
        // default implementation
    }

    protected abstract handleClick(link: CalendarLink): void;

    protected abstract handleLink(link: CalendarLink): void;

    protected match(value: Date, date?: Date) {
        return date && value.toLocaleDateString() === date.toLocaleDateString();
    }

    protected abstract getDefaultValue(defaultValue?: CalendarInputValue<M>): CalendarValue<M> | undefined;
}
