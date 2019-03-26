import {PaginationState} from "../PaginationState";
import {IPaginationLimitState} from "../props";

export class PaginationStateLimit extends PaginationState {
    protected state: Required<IPaginationLimitState>;

    public constructor(state: IPaginationLimitState) {
        super();

        this.state = {...state, offset: state.offset || 0};
    }

    public get previous(): number {
        if (this.isFirst) {
            return this.state.offset;
        }

        return this.state.offset - this.state.limit;
    }

    public get next(): number {
        if (this.isLast) {
            return this.state.offset;
        }

        return this.state.offset + this.state.limit;
    }

    public get page() {
        return (this.state.offset + this.state.limit) / this.state.limit;
    }

    public get pages() {
        return Math.floor(this.state.count / this.state.limit);
    }

    public setPage(page: number) {
        return new PaginationStateLimit({
            ...this.state,
            offset: (page - 1) * this.state.limit,
        });
    }
}
