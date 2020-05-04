import * as React from "react";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";
import {
    createPaginationState,
    getPaginationDependencies,
    IPaginationOptions,
    PaginationContext,
    PaginationProps,
    PaginationVariants,
} from "./props";

const {Provider} = PaginationContext;

const config = ElementFactory.create({component: "pagination"});

export const Pagination = config.factory<MakeProps<IPaginationOptions>, PaginationProps>(
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
            <nav {...p}>
                <Provider value={{state, set}}>
                    {children}
                </Provider>
            </nav>
        );
    },
);
