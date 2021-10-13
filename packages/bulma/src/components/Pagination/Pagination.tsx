import {MakeProps} from "../../interfaces";
import {ConfigFactory} from "../../utils";
import {IPaginationOptions, PaginationProps} from "./props";

const config = ConfigFactory.create({component: "pagination"});
export const Pagination = config.factory<MakeProps<IPaginationOptions>, PaginationProps>(
    ({props, children}) => {
        return (
            <nav {...props}>
                {children}
            </nav>
        );
    },
);
