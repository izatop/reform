export const debounce = (fn: () => void, timeout = 10) => {
    let debounceTimeout: number;
    return () => {
        window.clearTimeout(debounceTimeout);
        debounceTimeout = window.setTimeout(fn, timeout);
    };
};
