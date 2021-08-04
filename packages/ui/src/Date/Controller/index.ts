import {CalendarMode, MakeCalendarProps} from "../interfaces";
import {CalendarCheck} from "./CalendarCheck";
import {CalendarDate} from "./CalendarDate";
import {CalendarRange} from "./CalendarRange";

export function createCalendarController<M extends CalendarMode>(props: MakeCalendarProps<Record<any, any>, M>) {
    if (props.mode === "date") {
        return new CalendarDate(props as MakeCalendarProps<Record<any, any>, "date">);
    }

    if (props.mode === "range") {
        return new CalendarRange(props as MakeCalendarProps<Record<any, any>, "range">);
    }

    if (props.mode === "check") {
        return new CalendarCheck(props as MakeCalendarProps<Record<any, any>, "check">);
    }

    throw new Error("Unknown calendar mode");
}
