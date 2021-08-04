export interface IArgumentList {
    path: string;
    watch: boolean;
    serve?: boolean;
    mode: "production" | "development";
    readonly isProduction: boolean;
    readonly isDevelopment: boolean;
}

export function getArgumentList(): IArgumentList {
    const argumentList: IArgumentList = {
        get isDevelopment() {
            return !this.isProduction;
        },
        get isProduction() {
            return this.mode !== "development";
        },
        path: process.cwd(),
        mode: "production",
        watch: false,
    };

    const {argv: [...args]} = process;
    while (args.length > 0) {
        const arg = args.shift();
        switch (arg) {
            case "--serve":
                argumentList.serve = true;

                break;

            case "--dev":
                argumentList.mode = "development";
                break;

            case "-w":
            case "--watch":
                argumentList.watch = true;
                break;
        }
    }

    return argumentList;
}
