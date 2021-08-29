import React from "react";
import {HelloQuery} from "../query";
import icon from "./icons/icon.png";
import svg from "./icons/icon.svg";

export const Hello: React.FC = () => {
    return (
        <div>
            <h1>Hello, World!</h1>
            <pre>{HelloQuery}</pre>

            <img src={icon} alt={"icon"} />
            <a href={svg}>link</a>
        </div>
    );
};
