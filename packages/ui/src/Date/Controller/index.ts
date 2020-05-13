import {CalendarMode, MakeCalendarProps} from "../interfaces";
import {CalendarCheck} from "./CalendarCheck";
import {CalendarDate} from "./CalendarDate";
import {CalendarRange} from "./CalendarRange";

export function createCalendarController<M extends CalendarMode>(props: MakeCalendarProps<{}, M>) {
    if (props.mode === "date") {
        return new CalendarDate(props as MakeCalendarProps<{}, "date">);
    }

    if (props.mode === "range") {
        return new CalendarRange(props as MakeCalendarProps<{}, "range">);
    }

    if (props.mode === "check") {
        return new CalendarCheck(props as MakeCalendarProps<{}, "check">);
    }

    throw new Error(`Unknown calendar mode`);
}
