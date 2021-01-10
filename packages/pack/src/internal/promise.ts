export function isFulfilled<T>(state: PromiseSettledResult<T>): state is PromiseFulfilledResult<T> {
    return state.status === "fulfilled";
}
