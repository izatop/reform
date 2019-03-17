export type MenuEvents = "add" | "destroy" | "enter" | "leave" | "child:enter" | "mount";
export type MenuListener<T> = (...args: any[]) => void;

export class MenuTrigger<T = MenuEvents> {
    private readonly listeners = new Map<T, Array<MenuListener<T>>>();

    public off(event: T | T[], listener?: MenuListener<T>): void {
        if (Array.isArray(event)) {
            return event.forEach((e) => this.off(e, listener));
        }

        if (listener && this.listeners.has(event)) {
            this.listeners.set(
                event,
                this.listeners.get(event)!
                    .filter((child) => child !== listener),
            );
        } else {
            this.listeners.delete(event);
        }
    }

    public listen(event: T | T[], listener: MenuListener<T>) {
        if (Array.isArray(event)) {
            event.forEach((e) => this.listen(e, listener));
        } else {
            if (!this.listeners.has(event)) {
                this.listeners.set(event, []);
            }

            this.listeners.get(event)!
                .push(listener);
        }

        return () => this.off(event, listener);
    }

    public emit(event: T, ...args: any[]): void {
        const listeners = this.listeners.get(event) || [];
        listeners.forEach((fn) => fn(...args));
    }

    public destroy(): void {
        this.listeners.clear();
    }
}
