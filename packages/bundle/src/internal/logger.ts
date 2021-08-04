export function info(...args: any[]) {
    // eslint-disable-next-line no-console
    console.info(...args);
}

export function log(...args: any[]) {
    // eslint-disable-next-line no-console
    console.log(...args);
}

export function error(...args: any[]) {
    // eslint-disable-next-line no-console
    console.error(...args);
}

export function warn(...args: any[]) {
    // eslint-disable-next-line no-console
    console.warn(...args);
}

const logger = {
    info,
    log,
    error,
    warn,
};

export default logger;
