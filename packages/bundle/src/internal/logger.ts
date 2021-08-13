import {formatWithOptions, InspectOptions} from "util";

export type LogTarget = { constructor: { name: string }; id?: string };
export type LogArgs = [target: LogTarget | string, ...args: unknown[]];

const maxLineLen = 120;
const maxNameLen = 25;
const welcome = " > ";
const welcomeLen = welcome.length;

const formatOptions: InspectOptions = {
    colors: true,
    breakLength: maxLineLen - maxNameLen,
};

const format = (...args: any[]) => formatWithOptions(formatOptions, ...args);

const fd2 = (data: string) => setImmediate(() => process.stderr.write([data, "\n"].join("")));
const fd1 = (data: string) => setImmediate(() => process.stdout.write([data, "\n"].join("")));

const getTargetId = (target: LogTarget) => {
    return format("[%s] %s", target.id ?? "x", target.constructor.name);
};

const getTargetName = (target: LogArgs[0]) => {
    const id = typeof target === "string"
        ? format("[%s] %s", "x", target)
        : getTargetId(target);

    if (id.length > maxNameLen - welcomeLen) {
        return id
            .substr(0, maxNameLen - (welcomeLen + 3))
            .concat("...", welcome);
    }

    return id
        .concat(" ".repeat(maxNameLen))
        .substr(0, maxNameLen - welcomeLen)
        .concat(welcome);
};

const logger = {
    args(args: LogArgs) {
        const [target, ...nextArgs] = args;

        return [`${getTargetName(target)}`, format(...nextArgs)].join("");
    },
    info(...args: LogArgs) {
        // eslint-disable-next-line no-console
        if (!this.silent) fd1(this.args(args));
    },
    debug(...args: LogArgs) {
        // eslint-disable-next-line no-console
        if (this.verbose && !this.silent) fd1(this.args(args));
    },
    error(...args: LogArgs) {
        // eslint-disable-next-line no-console
        fd2(this.args(args));
    },
    warn(...args: LogArgs) {
        // eslint-disable-next-line no-console
        if (this.verbose && !this.silent) fd2(this.args(args));
    },
    silent: process.env.NODE_ENV === "test",
    verbose: false,
};

export default logger;
