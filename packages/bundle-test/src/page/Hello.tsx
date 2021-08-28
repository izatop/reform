import React from "react";
import HelloWorld from "../query/HelloWorld.gql";
import icon from "./icons/icon.png";
import svg from "./icons/icon.svg";

export const Hello: React.FC = () => {
    return (
        <div>
            <h1>Hello, World!</h1>
            <pre>{HelloWorld}</pre>

            <img src={icon} alt={"icon"} />
            <a href={svg}>link</a>
        </div>
    );
};
