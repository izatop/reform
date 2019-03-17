import * as React from "react";
import {Helpers} from "../../helpers";
import {PaginationContext, PaginationPagerOptions, PaginationPagerProps} from "./props";

const {Consumer} = PaginationContext;
const PaginationLinkOptions = {
    name: "pagination-link",
    is: ["current"],
};

export const PaginationPager: React.FC<PaginationPagerProps> = (props) => (
    <ul className={Helpers.calcClasses(props, PaginationPagerOptions)}>
        <Consumer>
            {({state, set}) => {
                return state.getRange(props.pages || 6, props.useful)
                    .map(({page}) => (
                        <li key={page}>
                            {typeof page === "number"
                                ? (
                                    <a onClick={() => set(page)}
                                       className={Helpers.calcClasses(
                                           {current: page === state.page},
                                           PaginationLinkOptions,
                                       )}>
                                        {page}
                                    </a>
                                )
                                : (
                                    <span className="pagination-ellipsis">&hellip;</span>
                                )
                            }
                        </li>
                    ));
            }}
        </Consumer>
    </ul>
);

PaginationPager.displayName = "PaginationPager";
