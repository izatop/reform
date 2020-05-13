export type ListenerFn<A extends any[]> = (...args: A) => any;

export class Listener<A extends any[]> {
    readonly #listeners: ListenerFn<A>[] = [];

    public fire(...args: A) {
        this.#listeners.forEach((fn) => {
            try {
                fn(...args);
            } catch (e) {
                // do nothing
            }
        });
    }

    public on(listener: ListenerFn<A>) {
        this.#listeners.push(listener);
        return () => {
            const index = this.#listeners.findIndex((fn) => fn === listener);
            if (index > -1) {
                this.#listeners.splice(index, 1);
            }
        };
    }
}
