import "./Code/prism.js";
import "./Code/style.css";
import * as React from "react";
import {Collapse} from "./Collapse";

type Props = { name?: string, code: string, open?: boolean };
export const Code: React.StatelessComponent<Props> = (props) => {
    let code = props.code, name = props.name;
    const result = props.code.match(/\{\/\*\s*@source.+@end\s*\*\/\}/sg);
    if (result && result.length > 0) {
        let trim = 0;
        const [snippet] = result;

        const match = snippet.match(/\/\*\s*@source ([a-z0-9\\.\-_]+)\s\*\//si);
        if (match) {
            name = match[1];
        }

        const lines = snippet.split("\n")
            .slice(1, -1);
        const spaceMatch = lines[0].match(/^\s+/);

        if (spaceMatch) {
            trim = spaceMatch[0].length;
        }

        let source = "";
        for (const line of lines) {
            source += line.substr(trim) + "\n";
        }

        code = source;
    } else {
        const match = code.match(/\/\*\s*@id ([a-z0-9\.\-_]+)\s\*\//si);
        if (match) {
            name = match[1];
            code = code.replace(/\/\*\s*@id ([a-z0-9\.\-_]+)\s\*\/\s*/si, "");
        }
    }

    return (
        <Collapse state={props.open}>
            <div className={"code"}>
                <p><b>{name}</b></p>
                <pre><code className={"language-typescript"}>{code}</code></pre>
            </div>
        </Collapse>
    )
}
