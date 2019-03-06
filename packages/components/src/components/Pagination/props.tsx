import {createContext} from "react";
import {Size} from "../../enum";
import {MakeProps} from "../../interfaces";
import {PaginationState} from "./PaginationState";
import {PaginationStateLimit} from "./PaginationState/PaginationStateLimit";
import {PaginationStatePage} from "./PaginationState/PaginationStatePage";

interface IPagination {
    state: PaginationState;
    set: (page: number) => void;
}

export const PaginationContext = createContext({} as IPagination);

export const PaginationOptions = {
    name: "pagination",
    is: ["size", "rounded", "centered"],
};

interface IPaginationProps {
    size?: Size;
    rounded?: boolean;
    centered?: boolean;
    navigation?: boolean;
    label?: (page: number) => string;
    onSelect?: (page: number) => Promise<boolean> | boolean;
    onChange?: (page: number) => void;
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

export interface IPaginationPageProps extends IPaginationPageState, IPaginationProps {
    type: "page";
}

export interface IPaginationLimitProps extends IPaginationLimitState, IPaginationProps {
    type: "limit";
}

export type PaginationProps = MakeProps<IPaginationPageProps | IPaginationLimitProps>;

export type PaginationPagerProps = MakeProps<{
    pages?: number;
    useful?: boolean;
}>;

export const PaginationPagerOptions = {
    name: "pagination-list",
};

export const getPaginationDependencies = (props: PaginationProps) => {
    if (props.type === "page") {
        const {page, count} = props;
        return [page, count];
    }

    if (props.type === "limit") {
        const {offset, limit, count} = props;
        return [offset, limit, count];
    }

    throw new Error("Invalid pagination props");
};

export const createPaginationState = (props: PaginationProps): PaginationState => {
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
