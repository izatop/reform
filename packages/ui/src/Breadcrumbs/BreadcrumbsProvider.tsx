import * as React from "react";
import {createContext, useMemo} from "react";
import {BreadcrumbPath, BreadcrumbsState} from "./BreadcrumbsState";

export interface BreadcrumbsProviderProps {
    base: BreadcrumbPath[];
}

export const BreadcrumbsProvider: React.FC<BreadcrumbsProviderProps> = ({children, base}) => {
    const breadcrumbs = useMemo(() => new BreadcrumbsState(base), [base]);
    return (
        <BreadcrumbsContext.Provider value={breadcrumbs}>
            {children}
        </BreadcrumbsContext.Provider>
    );
};

export const BreadcrumbsContext = createContext<BreadcrumbsState>(new BreadcrumbsState([]));
