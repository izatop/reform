export function isFulfilled<T>(state: PromiseSettledResult<T>): state is PromiseFulfilledResult<T> {
    return state.status === "fulfilled";
}

export function defer<T>(fn: (resolve: (value: T) => unknown) => unknown) {
    return new Promise<T>(async (resolve, reject) => {
        try {
            await fn(resolve);
        } catch (error) {
            reject(error);
        }
    });
}
