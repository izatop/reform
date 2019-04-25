import {PaginationState} from "../PaginationState";
import {IPaginationPageState} from "../props";

export class PaginationStatePage extends PaginationState {
    public readonly state: Required<IPaginationPageState>;

    public constructor(state: IPaginationPageState) {
        super();
        this.state = {...state, page: state.page || 1};
    }

    public get page() {
        return this.state.page;
    }

    public get pages() {
        return this.state.count;
    }

    public setPage(page: number) {
        return new PaginationStatePage({...this.state, page});
    }
}
