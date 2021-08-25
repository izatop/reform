import {useCallback, useEffect, useMemo, useState} from "react";
import {Listener} from "./utils";

export function useTimeout(timeout = 1000) {
    const [id, set] = useState<number>();
    const run = useCallback((fn: () => any) => set(setTimeout(fn, timeout)), [timeout]);
    const stop = useCallback(() => clearTimeout(id), [id]);
    useEffect(() => stop, [id, timeout]);

    return {run, stop};
}

export interface IUseDropdownStateOptions {
    active?: boolean;
    defaultActive?: boolean;
    closeOnLeave?: boolean;
    closeOnLeaveTimeout?: number;
    listener?: Listener<[boolean]>;
}

export interface IUseDropdownDispatcher {
    state: boolean;
    leave?: () => any;
    enter?: () => any;
    click?: (e: React.MouseEvent<any>) => any;
    clickOut?: (e: React.MouseEvent<any>) => any;
    toggle: () => any;
    set: (value: boolean) => any;
}

export function useDropdownState(options: IUseDropdownStateOptions): IUseDropdownDispatcher {
    const controlled = typeof options.active === "boolean";
    const {active, defaultActive, closeOnLeave, closeOnLeaveTimeout, listener} = options;
    const [state, setActive] = useState<boolean>(active ?? defaultActive ?? false);
    const onLeaveTimeout = useTimeout(closeOnLeaveTimeout);
    const onClickOutTimeout = useTimeout(10);

    useEffect(() => {
        if (listener) {
            return listener.on((value) => setActive(value));
        }
    }, [listener]);

    useEffect(
        () => {
            if (state) {
                const clickOutHandle = () => {
                    onClickOutTimeout.run(() => setActive(false));
                };

                document.body.addEventListener("click", clickOutHandle);
                return () => document.body.removeEventListener("click", clickOutHandle);
            }
        }, [state, onClickOutTimeout],
    );

    return useMemo(
        () => {
            const dispatcher: IUseDropdownDispatcher = {
                state,
                set: (value: boolean) => setActive(value),
                toggle: () => {
                    if (!controlled && closeOnLeave && state) {
                        onLeaveTimeout.stop();
                    }

                    setActive(!state);
                },
            };

            if (!controlled && closeOnLeave) {
                dispatcher.leave = () => {
                    onLeaveTimeout.run(() => setActive(false));
                };

                dispatcher.enter = () => {
                    onLeaveTimeout.stop();
                };
            }

            if (!controlled) {
                dispatcher.clickOut = () => {
                    onClickOutTimeout.stop();
                };

                dispatcher.click = () => {
                    onClickOutTimeout.stop();
                    dispatcher.toggle();
                };
            }

            return dispatcher;
        }, [
            controlled,
            state,
            closeOnLeave,
            closeOnLeaveTimeout,
            onClickOutTimeout,
            onLeaveTimeout,
        ],
    );
}

export function useListener<T>() {
    return useMemo(() => new Listener<[T]>(), []);
}
