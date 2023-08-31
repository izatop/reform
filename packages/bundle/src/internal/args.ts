import {assert} from ".";
import logger from "./logger";

export interface IArgumentList {
    print?: true;
    path: string;
    watch: boolean;
    serve?: boolean;
    mode: "production" | "development";
    ids: string[];

    readonly isProduction: boolean;
    readonly isDevelopment: boolean;
    readonly verbose: boolean;
    readonly silent: boolean;
}

export type InputArgumentList = {
    -readonly [K in keyof IArgumentList]: IArgumentList[K];
};

export function getArgumentList(root?: string): IArgumentList {
    const argumentList: InputArgumentList = {
        get isDevelopment() {
            return !this.isProduction;
        },
        get isProduction() {
            return this.mode !== "development";
        },
        ids: [],
        path: root ?? process.cwd(),
        mode: "production",
        watch: false,
        verbose: false,
        silent: false,
    };

    const {argv: [...args]} = process;
    while (args.length > 0) {
        const arg = args.shift();
        switch (arg) {
            case "-p":
            case "--print":
                argumentList.print = true;
                break;

            case "-v":
            case "--verbose":
                argumentList.verbose = true;
                logger.verbose = true;
                break;
            case "-s":
            case "--silent":
                argumentList.silent = true;
                logger.silent = true;
                break;
            case "--serve":
                argumentList.serve = true;
                argumentList.watch = true;
                break;

            case "--dev":
                argumentList.mode = "development";
                break;

            case "-w":
            case "--watch":
                argumentList.watch = true;
                break;
            case "-i":
            case "--id":
                assert(args[0], "The bundle ID expected after --id/-i option");
                argumentList.ids.push(args[0]);
                args.shift();
        }
    }

    return argumentList;
}
