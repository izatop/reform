import {CalendarInputValue, CalendarValue} from "../interfaces";
import {CalendarControllerAbstract} from "./CalendarControllerAbstract";
import {CalendarLink} from "./CalendarLink";

export class CalendarDate extends CalendarControllerAbstract<"date"> {
    #active?: CalendarLink;

    public handleClick(link: CalendarLink) {
        link.toggleChecked();

        if (this.match(link.date, this.value)) {
            this.update(undefined);
            this.#active = undefined;
        } else {
            this.update(link.date);
            if (this.#active) {
                this.#active.toggleChecked();
            }

            this.#active = link;
        }
    }

    public handleLink(link: CalendarLink) {
        if (this.match(link.date, this.value)) {
            link.toggleChecked();
            this.#active = link;
        }
    }

    protected getDefaultValue(defaultValue?: CalendarInputValue<"date">): CalendarValue<"date"> {
        return defaultValue ? new Date(defaultValue) : new Date();
    }
}
