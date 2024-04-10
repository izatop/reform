import {assignWithFilter, BuildContext, PluginAbstract} from "@reform/bundle";
import {readFile} from "fs/promises";

export type Config = {filter: RegExp};

const extensions = ["ts", "tsx"];
const defaultFilter = new RegExp(`\\.gql\\.(${extensions.join("|")})$`);

export class Plugin extends PluginAbstract<Config> {
    public readonly name = "@reform/graphql-tag-min";

    constructor(context: BuildContext, config?: Config) {
        super(context, assignWithFilter({filter: defaultFilter}, config));
    }

    public configure(): void {
        this
            .on("load", this.config, async ({path}) => {
                const contents = await readFile(path, {encoding: "utf-8"});

                return {contents: this.#patch(contents), loader: "tsx"};
            });
    }

    #patch(contents: string): string {
        if (contents.includes("gql`")) {
            return contents.replace(/gql`([^`]+)`;/g, (_, $1) => {
                return `gql\`${$1.replace(/\s+/g, " ")}\`;`;
            });
        }

        return contents;
    }
}
