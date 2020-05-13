import {Table, TableBody, TableHead, TableHeadCell, TableRow} from "@reform/bulma";
import * as React from "react";
import {forwardRef, useCallback, useEffect} from "react";
import {useCalendarController, useCalendarMonth} from "./functions";
import {CalendarMode, MakeCalendarProps} from "./interfaces";

export interface ICalendarProps {
    date: Date;
    locales?: string | string[];
    onMouseOver?: (date: Date) => any;
    onClick?: (date: Date) => any;
}

export function Calendar<M extends CalendarMode>(props: MakeCalendarProps<ICalendarProps, M>) {
    const {onMouseOver, onClick, onChange, locales, date, ...options} = props;
    const {week, dates} = useCalendarMonth({date, locales});
    const controller = useCalendarController<M>(options as MakeCalendarProps<{}, M>, [dates]);
    useEffect(() => controller.listen(onChange as any), [controller]);

    return (
        <Table className={"calendar"} fullwidth>
            <TableHead>
                <TableRow>
                    {week.map((day) => (
                        <TableHeadCell textAlign={"centered"} key={day}>
                            {day}
                        </TableHeadCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {dates.map((cells, key) => (
                    <TableRow key={key}>
                        {cells.map((day) => (
                            <CalendarCell ref={controller.createRef(day)}
                                          key={day.getTime()}
                                          onClick={onClick}
                                          outOfRange={day.getMonth() !== date.getMonth()}
                                          onMouseOver={onMouseOver}
                                          date={day}/>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

interface ICalendarCell {
    date: Date;
    outOfRange?: boolean;
    onMouseOver?: (date: Date) => any;
    onClick?: (date: Date) => any;
    ref?: React.Ref<HTMLTableCellElement>;
}

function makeHandle(date: Date, fn?: (value: Date) => any) {
    return useCallback(() => fn ? fn(date) : () => void 0, [fn]);
}

const CalendarCellFunction: React.FC<ICalendarCell> = (props) => {
    const {onClick, onMouseOver, date, outOfRange} = props;
    const handleClick = makeHandle(props.date, onClick);
    const handleMouseOver = makeHandle(props.date, onMouseOver);
    return (
        <td ref={props.ref}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            className={outOfRange ? "is-out-of-range" : ""}
            key={date.getTime()}>
            {date.getDate()}
        </td>
    );
};

const CalendarCell = forwardRef<HTMLTableCellElement, ICalendarCell>(
    (props, ref) => CalendarCellFunction({...props, ref}),
);
