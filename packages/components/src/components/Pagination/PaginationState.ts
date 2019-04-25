import {IPaginationLimitState, IPaginationPageState} from "./props";

interface IRange {
    page: number | string;
}

export abstract class PaginationState {
    protected constructor() {
    }

    public get isLast() {
        return this.page === this.pages;
    }

    public get isFirst() {
        return this.page === 1;
    }

    public abstract get state(): IPaginationLimitState | IPaginationPageState;

    public get previous(): number {
        if (this.isFirst) {
            return 0;
        }

        return this.page - 1;
    }

    public get next(): number {
        if (this.isLast) {
            return this.pages;
        }

        return this.page + 1;
    }

    public abstract get page(): number;

    public abstract get pages(): number;

    public getRange(pages: number, useful?: boolean) {
        let edge = Math.floor(pages / 2);
        let start = 1;
        let end = pages > this.pages ? this.pages : pages;

        if (pages < this.pages) {
            start = this.page - edge;
            if (start < 1) {
                edge += Math.abs(start) + 1;
                start = 1;
            }

            end = this.page + edge;

            if (end > this.pages) {
                start -= end - this.pages;
                end = this.pages;
            }
        }

        const range: IRange[] = new Array(end - start + 1)
            .fill(null)
            .map((_, index) => ({page: index + start}));

        if (start > 1) {
            range.unshift({page: "ellipsis-prev"});
        }

        if (useful && start > 2) {
            range.unshift({page: 1});
        }

        if (end < this.pages) {
            range.push({page: "ellipsis-next"});
        }

        if (useful && this.page + edge + 1 < this.pages) {
            range.push({page: this.pages});
        }

        return range;
    }

    public abstract setPage(page: number): PaginationState;
}
