export type MenuEvents = "add" | "destroy" | "enter" | "leave" | "child:enter" | "mount";
export type MenuListener<T> = (...args: any[]) => void;

export class MenuTrigger<T = MenuEvents> {
    private readonly listeners = new Map<T, Array<MenuListener<T>>>();

    public listen(event: T | T[], listener: MenuListener<T>): void {
        if (Array.isArray(event)) {
            return event.forEach((e) => this.listen(e, listener));
        }

        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event)!
            .push(listener);
    }

    public emit(event: T, ...args: any[]) {
        const listeners = this.listeners.get(event) || [];
        listeners.forEach((fn) => fn(...args));
    }

    public destroy() {
        this.listeners.clear();
    }
}
