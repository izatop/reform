import React from "react";
import HelloWorld from "../query/HelloWorld.gql";

export const Hello: React.FC = () => {
    return (
        <div>
            <pre>{HelloWorld}</pre>
        </div>
    );
};
