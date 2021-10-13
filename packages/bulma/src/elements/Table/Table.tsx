import {MakeProps, XProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";

export interface ITable {
    fullwidth?: boolean;
    bordered?: boolean;
    striped?: boolean;
    narrow?: boolean;
    hoverable?: boolean;
}

const config = ConfigFactory.create({component: "table"});
export const Table = config.factory<MakeProps<ITable>, XProps<"table">>(({props, children}) => (
    <table {...props}>{children}</table>
));
