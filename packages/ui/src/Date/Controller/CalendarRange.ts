import {CalendarInputValue, CalendarValue} from "../interfaces";
import {CalendarControllerAbstract} from "./CalendarControllerAbstract";
import {CalendarLink} from "./CalendarLink";

export class CalendarRange extends CalendarControllerAbstract<"range"> {
    #hover?: CalendarLink;
    #selected?: CalendarLink;

    protected handleMouseLeave(link: CalendarLink) {
        if (this.#hover && this.#selected) {
            const selected = this.#selected;
            const not = (value: CalendarLink) => value !== selected;
            const links = [...this.links.values()].map((item) => item.link);
            links.filter(not).forEach((item) => item.reset());
            if (link === this.#selected) {
                link.toggleHover();
            }
        }
    }

    protected handleMouseEnter(link: CalendarLink) {
        this.#hover = link;
        if (!this.value && this.#selected) {
            const selected = this.#selected;
            const not = (value: CalendarLink) => value !== selected;
            const match = ({date: value}: CalendarLink) => (
                value > selected.date && value < link.date
                || value < selected.date && value > link.date
            );

            const links = [...this.links.values()].map((item) => item.link);

            links.filter(not).forEach((item) => item.reset());
            links.filter(match).forEach((item) => item.toggleSelection());
            link.toggleHover();
        }
    }

    protected handleClick(link: CalendarLink) {
        if (this.#selected) {
            const range: CalendarValue<"range"> = [this.#selected.date, link.date];
            this.update(range.sort((a, b) => a.getTime() - b.getTime()));
            this.#selected = undefined;
            this.#hover = undefined;
            return;
        }

        if (!this.value) {
            return;
        }

        this.update();
        link.toggleChecked();
        link.toggleHover();
        this.#selected = link;
    }

    protected handleUpdate() {
        if (this.value) {
            const [start, end] = this.value;
            for (const {link} of this.links.values()) {
                link.reset();
                if (link.date >= start && link.date <= end) {
                    link.toggleSelection();
                }

                if (this.match(link.date, start) || this.match(link.date, end)) {
                    link.toggleChecked();
                }
            }

            return;
        }

        for (const {link} of this.links.values()) {
            link.reset();
        }
    }

    protected handleLink(link: CalendarLink) {
        if (!this.value) {
            return;
        }

        const [start, end] = this.value;
        if (link.date >= start && link.date <= end) {
            link.toggleSelection();
        }

        if (this.match(link.date, start) || this.match(link.date, end)) {
            link.toggleChecked();
        }
    }

    protected getDefaultValue(defaultValue: CalendarInputValue<"range">): CalendarValue<"range"> {
        if (defaultValue) {
            const [s, e] = defaultValue;
            return [new Date(s), new Date(e)];
        }

        return [new Date(), new Date()];
    }
}
