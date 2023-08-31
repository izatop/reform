import {formatWithOptions, InspectOptions} from "util";

export type LogTarget = {constructor: {name: string}; id?: string};
export type LogArgs = [target: LogTarget | string, ...args: [message: string, ...args: unknown[]]];

const maxLineLen = 120;
const maxNameLen = 25;

const formatOptions: InspectOptions = {
    colors: true,
    breakLength: maxLineLen - maxNameLen,
    maxStringLength: maxLineLen * 3,
    getters: false,
};

const format = (...args: any[]) => formatWithOptions(formatOptions, ...args);

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m",
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m",
    },
};

const welcome = ">";

const fd2 = (data: string) => process.stderr.write([data, "\n"].join(""));
const fd1 = (data: string) => process.stdout.write([data, "\n"].join(""));

const getTargetId = (target: LogTarget) => {
    if (target.id) {
        return format("[%s: %s]", target.constructor.name, target.id);
    }

    return format("[%s]", target.constructor.name);
};

const getTargetName = (target: LogArgs[0]) => {
    const label = typeof target === "string"
        ? format("[%s]", target)
        : getTargetId(target);

    if (label.length > maxNameLen) {
        return label
            .substr(0, maxNameLen + 3)
            .concat("...", welcome);
    }

    return label
        .concat(" ".repeat(maxNameLen))
        .substr(0, maxNameLen)
        .concat(welcome);
};

export const logger = {
    format(args: LogArgs, color: string) {
        const [target, ...nextArgs] = args;

        return [`${color}${getTargetName(target)}${colors.reset}`, format(...nextArgs)];
    },
    info(...args: LogArgs) {
        const [label, message] = this.format(args, colors.bg.blue);
        if (!this.silent) {
            fd1(`${label} ${message}`);
        }
    },
    debug(...args: LogArgs) {
        if (this.verbose && !this.silent) {
            const [label, message] = this.format(args, `${colors.bg.magenta}`);
            fd1(`${label} ${message}`);
        }
    },
    error(error: Error | string, ...args: LogArgs) {
        const [label, message] = this.format(args, colors.bg.red);
        fd2(`${label} ${message}`);

        const [label2, message2] = this.format([args[0], "%s", error], colors.bg.red);
        fd2(`${label2} ${message2}`);
    },
    warn(...args: LogArgs) {
        if (this.verbose && !this.silent) {
            const [label, message] = this.format(args, colors.bg.yellow);
            fd2(`${label} ${message}`);
        }
    },
    silent: process.env.NODE_ENV === "test",
    verbose: false,
};

export default logger;
