import {CalendarInputValue, CalendarValue} from "../interfaces";
import {CalendarControllerAbstract} from "./CalendarControllerAbstract";
import {CalendarLink} from "./CalendarLink";

const wm = new WeakMap<CalendarCheck, Set<string>>();

function index(target: CalendarCheck) {
    const set = wm.get(target) || new Set();
    if (!wm.has(target)) {
        wm.set(target, set);
    }

    return set;
}

export class CalendarCheck extends CalendarControllerAbstract<"check"> {
    declare public readonly value: CalendarValue<"check">;
    declare protected current: CalendarValue<"check">;

    protected handleClick(link: CalendarLink) {
        link.toggleChecked();
        if (index(this).has(link.date.toLocaleDateString())) {
            this.update(this.value.filter((item) => !this.match(item, link.date)));
            return;
        }

        this.update([...this.value, link.date]);
    }

    protected handleLink(link: CalendarLink) {
        if (index(this).has(link.date.toLocaleDateString())) {
            link.toggleChecked();
        }
    }

    protected handleUpdate(value: CalendarValue<"check">) {
        index(this).clear();
        value.forEach((item) => index(this).add(item.toLocaleDateString()));
    }

    protected getDefaultValue(defaultValue?: CalendarInputValue<"check">): CalendarValue<"check"> {
        if (defaultValue) {
            return defaultValue.map((item) => new Date(item));
        }

        return [];
    }
}
