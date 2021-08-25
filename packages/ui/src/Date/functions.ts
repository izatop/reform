import {useEffect, useMemo} from "react";
import {createCalendarController} from "./Controller";
import {CalendarMode, MakeCalendarProps} from "./interfaces";
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export interface DateRangeOptions {
    startWeekDay?: number;
    date?: Date | string | number;
    locales?: string | string[];
}

function createWeekDayNames(locales: string | string[]) {
    const date = new Date();
    const intl = new Intl.DateTimeFormat(locales, {weekday: "short"});
    const weekDays: string[] = [];
    date.setDate(date.getDate() - date.getDay());
    for (let i = 0; i < 7; i++) {
        weekDays.push(intl.format(date).substr(0, 2));
        date.setDate(date.getDate() + 1);
    }

    return weekDays;
}

export function useCalendarMonth(options: DateRangeOptions = {}) {
    return useMemo(() => {
        const locales: string | string[] = options.locales || [...navigator.languages];
        const startWeekDay = options.startWeekDay || 1;
        const rows = 5;
        const cols = 7;
        const cells = rows * cols;
        const now = new Date(options.date ?? Date.now());
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDay();
        const begins = new Date(year, month, 1);
        const adds = -begins.getDay() + 1 + startWeekDay;
        const datesArray = new Array(cells)
            .fill(0)
            .map((v, index) => adds + index)
            .map((d) => new Date(year, month, d));

        const weekDayNames = createWeekDayNames(locales);
        const week = [
            ...weekDayNames.slice(startWeekDay),
            ...weekDayNames.slice(0, startWeekDay),
        ];

        let num = 0;
        const dates: Date[][] = [];
        for (let i = 0; i < rows; i++) {
            const weekDates: Date[] = new Array(cols);
            for (let j = 0; j < cols; j++) {
                const d = datesArray[num++];
                weekDates[d.getDay()] = d;
            }

            dates.push([
                ...weekDates.slice(startWeekDay),
                ...weekDates.slice(0, startWeekDay),
            ]);
        }

        return {dates, week, month, year, day, locales};
    }, [options.date, options.startWeekDay]);
}

const defaultLocales = [...navigator.languages];

export function useLocale(locales: string | string[] = defaultLocales) {
    return useMemo(() => locales, [locales]);
}

export function useDateFormat(locales: string | string[], options?: DateTimeFormatOptions) {
    return useMemo(() => Intl.DateTimeFormat(locales, options), [locales, options]);
}

export function useCalendarController<M extends CalendarMode>(props: MakeCalendarProps<Record<any, any>, M>,
    deps: any[] = []) {
    const controller = useMemo(() => createCalendarController<M>(props), deps);
    useEffect(() => () => controller.dispose(), deps);
    return controller;
}
