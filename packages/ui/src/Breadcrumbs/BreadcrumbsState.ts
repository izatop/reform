import {ReactElement, useEffect, useState} from "react";

export type BreadcrumbPath = [string, string, (string | ReactElement)?];
export type BreadcrumbsListener = (paths: BreadcrumbPath[]) => any;

export class BreadcrumbsState {
    #store: BreadcrumbPath[] = [];
    public readonly base: BreadcrumbPath[];
    readonly #listeners: BreadcrumbsListener[] = [];

    constructor(base: BreadcrumbPath[]) {
        this.base = base;
        this.#store = [...base];
    }

    public get paths() {
        return [...this.#store];
    }

    public mount(...path: BreadcrumbPath[]) {
        useEffect(() => {
            this.#store.push(...path);
            this.emit(this.paths);

            return () => {
                this.#store = [...this.base];
                this.emit(this.paths);
            };
        });
    }

    public usePaths() {
        const [state, setState] = useState(this.paths);
        useEffect(() => this.listen((paths) => setState(paths)));
        return state;
    }

    protected listen(listener: BreadcrumbsListener) {
        this.#listeners.push(listener);
        return () => {
            const index = this.#listeners.findIndex((fn) => listener === fn);
            this.#listeners.splice(index, 1);
        };
    }

    protected emit(paths: BreadcrumbPath[]) {
        requestAnimationFrame(() => this.#listeners.forEach((fn) => fn(paths)));
    }
}
