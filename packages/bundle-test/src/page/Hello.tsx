import {FC} from "react";
import {HelloQuery} from "../query";
import icon from "../icons/icon.png";
import svg from "../icons/icon.svg";

export const Hello: FC = () => {
    return (
        <div>
            <section className="flex">
                <div>
                    <a href={svg}><img src={icon} alt={"icon"} /></a>
                </div>
                <div>
                    <h1>Hello!</h1>
                    <h2>Test: {TEST}</h2>
                </div>
            </section>
            <section>
                <pre>{JSON.stringify(HelloQuery, null, 2)}</pre>
            </section>

        </div>
    );
};
