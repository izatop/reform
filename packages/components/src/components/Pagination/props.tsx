import {createContext} from "react";
import {XProps} from "../../interfaces";
import {Size} from "../../options";
import {PaginationState} from "./PaginationState";
import {PaginationStateLimit} from "./PaginationState/PaginationStateLimit";
import {PaginationStatePage} from "./PaginationState/PaginationStatePage";

interface IPagination {
    state: PaginationState;
    set: (page: number) => void;
}

export const PaginationContext = createContext({} as IPagination);

export interface IPaginationOptions {
    "is-size"?: Size;
    "is-rounded"?: boolean;
    "is-centered"?: boolean;
}

export interface IPaginationProps {
    navigation?: boolean;
}

export interface IPaginationPageState {
    page?: number;
    count: number;
}

export interface IPaginationLimitState {
    limit: number;
    offset?: number;
    count: number;
}

export interface IPaginationPageProps extends IPaginationPageState,
    IPaginationProps {
    type: "page";
    onPageSelect?: (state: Readonly<Required<IPaginationPageState>>) => Promise<boolean> | boolean;
    onPageChange?: (state: Readonly<Required<IPaginationPageState>>) => void;
}

export interface IPaginationLimitProps extends IPaginationLimitState,
    IPaginationProps {
    type: "limit";
    onPageSelect?: (state: Readonly<Required<IPaginationLimitState>>) => Promise<boolean> | boolean;
    onPageChange?: (state: Readonly<Required<IPaginationLimitState>>) => void;
}

export type PaginationVariants = IPaginationPageProps | IPaginationLimitProps;
export type PaginationProps = XProps<"nav"> & PaginationVariants;

export interface IPaginationPagerProps {
    pages?: number;
    useful?: boolean;
}

export const getPaginationDependencies = (props: PaginationVariants) => {
    if (props.type === "page") {
        const {page, count} = props;
        return [count, page];
    }

    if (props.type === "limit") {
        const {offset, limit, count} = props;
        return [offset, limit, count];
    }

    throw new Error("Invalid pagination props");
};

export const createPaginationState = (props: PaginationVariants): PaginationState => {
    if (props.type === "page") {
        const {page, count} = props;
        return new PaginationStatePage({page, count});
    }

    if (props.type === "limit") {
        const {offset, limit, count} = props;
        return new PaginationStateLimit({offset, limit, count});
    }

    throw new Error("Invalid pagination props");
};
