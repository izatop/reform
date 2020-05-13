import {CalendarLinkType} from "../interfaces";
import {CalendarControllerAbstract} from "./CalendarControllerAbstract";

export class CalendarLink {
    public readonly date: Date;
    readonly #ref: CalendarLinkType;
    readonly #context: CalendarControllerAbstract<any>;

    constructor(context: CalendarControllerAbstract<any>, date: Date, ref: CalendarLinkType) {
        this.#ref = ref;
        this.#context = context;
        this.date = date;
    }

    public toggleChecked(force?: boolean) {
        this.#ref.classList.toggle("is-checked", force);
    }

    public toggleHover(force?: boolean) {
        this.#ref.classList.toggle("is-hover", force);
    }

    public toggleSelection(force?: boolean) {
        this.#ref.classList.toggle("has-selection", force);
    }

    public reset() {
        this.toggleHover(false);
        this.toggleChecked(false);
        this.toggleSelection(false);
    }

    public dispose() {
        // nothing
    }
}
