import * as React from "react";
import {config} from "../../forms";
import {MakeProps} from "../../interfaces";
import {
    createPaginationState,
    getPaginationDependencies,
    IPaginationOptions,
    PaginationContext,
    PaginationVariants,
} from "./props";

const {Provider} = PaginationContext;

export const PaginationProvider = config.factory<MakeProps<IPaginationOptions>, PaginationVariants>(
    ({props, children}) => {
        const {onPageChange, onPageSelect, ...p} = props;
        const deps = getPaginationDependencies(p as PaginationVariants);
        const defaultState = React.useMemo(() => createPaginationState(p as PaginationVariants), deps);
        const [state, setState] = React.useState(defaultState);
        React.useLayoutEffect(() => {
            requestAnimationFrame(() => {
                setState(defaultState);
            });
        }, deps);

        const set = React.useCallback(
            async (value: number) => {
                let valid = true;
                const newState = state.setPage(value);
                if (onPageSelect) {
                    valid = await onPageSelect(newState.state as any);
                }

                if (valid) {
                    setState(newState);
                    if (onPageChange) {
                        onPageChange(newState.state as any);
                    }
                }
            },
            deps,
        );

        return (
            <Provider value={{state, set}}>
                {children}
            </Provider>
        );
    },
);
