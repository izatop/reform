import {HelloQuery} from "../query";
import icon from "../icons/icon.png";
import svg from "../icons/icon.svg";
import {Card} from "./Card";

export const Hello: React.FC = () => {
    return (
        <div>
            <Card/>
            <section className="flex">
                <div>
                    <a href={svg}><img src={icon} alt={"icon"} /></a>
                </div>
                <div>
                    <h1>Hello!</h1>
                    <h2>Var: {TEST},
                        Num: {JSON.stringify(NUM_VAR)},
                        Bool: {JSON.stringify(BOOL_VAR)},
                        Null: {JSON.stringify(NULL_VAR)},
                        Undefined: {JSON.stringify(UNDEFINED_VAR)}
                    </h2>
                </div>
            </section>
            <section>
                <pre>{JSON.stringify(HelloQuery, null, 2)}</pre>
            </section>
        </div>
    );
};
