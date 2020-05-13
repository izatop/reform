export type DatePickerValue = string | number | Date;
export type CalendarMode = "date" | "range" | "check";

export type DateRange = [Date, Date];
export type DateRangeInput = [DatePickerValue, DatePickerValue];

export type CalendarValues = {
    date: Date | undefined;
    range: [Date, Date] | undefined;
    check: Date[];
};

export type CalendarInputValues = {
    date: DatePickerValue | undefined;
    range: DateRangeInput | undefined;
    check: DatePickerValue[];
};

export type CalendarValue<T extends CalendarMode> = CalendarValues[T];
export type CalendarInputValue<T extends CalendarMode> = CalendarInputValues[T];

export type MakeCalendarProps<P, M extends CalendarMode> = P & {
    value: CalendarInputValue<M>;
    onChange: (value: CalendarValue<M>) => any;
    mode: M;
} | P & {
    onChange?: (value: CalendarValue<M>) => any;
    defaultValue: CalendarInputValue<M>;
    mode: M;
};

export type CalendarUpdateListener<M extends CalendarMode> = (value: CalendarValue<M>) => any;
export type CalendarLinkType = HTMLTableCellElement;
