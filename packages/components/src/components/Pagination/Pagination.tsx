import * as React from "react";
import {Helpers} from "../../helpers";
import {
    createPaginationState,
    getPaginationDependencies,
    PaginationContext,
    PaginationOptions,
    PaginationProps,
} from "./props";

const {Provider} = PaginationContext;

export const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
    const dependencies = getPaginationDependencies(props);
    const defaultState = React.useMemo(
        () => createPaginationState(props),
        dependencies,
    );

    const [state, setState] = React.useState(defaultState);
    const set = React.useCallback(
        async (value: number) => {
            let valid = true;
            if (props.onSelect) {
                valid = await props.onSelect(value);
            }

            if (valid) {
                const newState = state.setPage(value);
                setState(newState);
                if (props.onChange) {
                    props.onChange(newState.page);
                }
            }
        },
        dependencies,
    );

    return (
        <nav className={Helpers.calcClasses(props, PaginationOptions)}>
            <Provider value={{state, set}}>
                {props.children}
            </Provider>
        </nav>
    );
};

Pagination.displayName = "Pagination";
