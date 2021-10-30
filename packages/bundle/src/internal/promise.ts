export function isFulfilled<T>(state: PromiseSettledResult<T>): state is PromiseFulfilledResult<T> {
    return state.status === "fulfilled";
}

export function defer<T>(fn: (resolve: (value: T) => unknown) => unknown) {
    return new Promise<T>((resolve, reject) => {
        try {
            Promise
                .resolve(fn(resolve))
                .catch(reject);
        } catch (error) {
            reject(error);
        }
    });
}

export type Promisify<T> = T | Promise<T>;
