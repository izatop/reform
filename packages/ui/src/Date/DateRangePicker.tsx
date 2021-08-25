import {Button, Column, Columns, Dropdown, DropdownElement, Icon, useListener} from "@reform/bulma";
import * as React from "react";
import {useCallback, useMemo, useState} from "react";
import {Calendar} from "./Calendar";
import {useDateFormat, useLocale} from "./functions";
import {DateRange, DateRangeInput} from "./interfaces";

export interface IDateRangePickerProps {
    defaultValue?: DateRangeInput;
    onChange?: (value?: [number, number]) => any;
    locales?: string | string[];
}

function getMonth(date: Date, value: number) {
    return new Date(date.getFullYear(), date.getMonth() + value, 1);
}

export const DateRangePicker: React.FC<IDateRangePickerProps> = (props) => {
    const listener = useListener<boolean>();
    const [range, setRange] = useState<DateRange | undefined>(
        props.defaultValue
            ? [new Date(props.defaultValue[0]), new Date(props.defaultValue[1])]
            : undefined,
    );

    const {onChange = () => void 0} = props;
    const handleChange = useCallback((value?: DateRange) => {
        if (value) {
            setRange(value);
            listener.fire(false);
            return onChange(value.map((d) => d.getTime()) as [number, number]);
        }

        onChange();
    }, [props.onChange]);

    const [month, setMonth] = useState<Date>(range ? new Date(range[1]) : new Date());

    const df = useDateFormat(useLocale(props.locales));
    const mf = useDateFormat(useLocale(props.locales), {month: "long"});
    const input = useMemo(() => range ? `${df.format(range[0])} - ${df.format(range[1])}` : "-", [range]);
    const prevMonth = useCallback(() => setMonth(getMonth(month, -1)), [month]);
    const nextMonth = useCallback(() => setMonth(getMonth(month, +1)), [month]);

    return (
        <Dropdown selectable={false}
            listener={listener}
            icon={{down: "calendar-alt"}}
            button={<span className={"button"}>{input}</span>}>
            <DropdownElement>
                <div className={"date-picker"}
                    onClick={e => e.stopPropagation()}>
                    <Columns breakpoint={"mobile"} gap={0}>
                        <Column>
                            <Button onClick={prevMonth} size={"small"}>
                                <Icon icon={"arrow-left"}/>
                            </Button>
                        </Column>
                        <Column textAlign={"centered"}
                            textTransform={"capitalized"}
                            textSize={5}>
                            {mf.format(month)}
                        </Column>
                        <Column textAlign={"right"}>
                            <Button onClick={nextMonth} size={"small"}>
                                <Icon icon={"arrow-right"}/>
                            </Button>
                        </Column>
                    </Columns>
                    <Calendar mode={"range"}
                        date={month}
                        onChange={handleChange}
                        defaultValue={range}/>
                </div>
            </DropdownElement>
        </Dropdown>
    );
};
