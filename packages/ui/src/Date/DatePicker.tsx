import {Button, Column, Columns, Dropdown, DropdownElement, Icon, useListener} from "@reform/bulma";
import * as React from "react";
import {useCallback, useMemo, useState} from "react";
import {Calendar} from "./Calendar";
import {useDateFormat, useLocale} from "./functions";
import {DatePickerValue} from "./interfaces";

export interface IDatePickerProps {
    defaultValue?: DatePickerValue;
    onChange?: (value?: number) => any;
    locales?: string | string[];
}

function getMonth(date: Date, value: number) {
    return new Date(date.getFullYear(), date.getMonth() + value, 1);
}

export const DatePicker: React.FC<IDatePickerProps> = (props) => {
    const listener = useListener<boolean>();
    const [date, setDate] = useState<Date | undefined>(
        props.defaultValue
            ? new Date(props.defaultValue)
            : undefined,
    );

    const {onChange = () => void 0} = props;
    const handleChange = useCallback((value?: Date) => {
        if (value) {
            setDate(value);
            listener.fire(false);
            return onChange(value ? value.getTime() : undefined);
        }

        onChange();
    }, [props.onChange]);

    const [month, setMonth] = useState<Date>(date ?? new Date());

    const df = useDateFormat(useLocale(props.locales));
    const mf = useDateFormat(useLocale(props.locales), {month: "long"});
    const input = useMemo(() => date ? df.format(date) : "", [date]);
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
                    <Calendar mode={"date"}
                              date={month}
                              onChange={handleChange}
                              defaultValue={date}/>
                </div>
            </DropdownElement>
        </Dropdown>
    );
};
