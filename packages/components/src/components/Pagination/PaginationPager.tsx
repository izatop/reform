import * as React from "react";
import {ElementFactory} from "../../utils";
import {PaginationLink} from "./PaginationLink";
import {IPaginationPagerProps, PaginationContext} from "./props";

const {Consumer} = PaginationContext;
const config = ElementFactory.create({component: "pagination-list"});

export const PaginationPager = config.factory<{}, IPaginationPagerProps>(({props}) => {
    const {pages, useful, ...p} = props;
    return (
        <ul {...p}>
            <Consumer>
                {({state, set}) => {
                    return state.getRange(pages || 6, useful)
                        .map(({page}) => (
                            <li key={page}>
                                <PaginationLink page={page}
                                                set={set}
                                                is-current={page === state.page}/>
                            </li>
                        ));
                }}
            </Consumer>
        </ul>
    )
});
