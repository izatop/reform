import * as React from "react";
import {ElementFactory} from "../../utils";

interface IPaginationLink {
    "is-current"?: boolean;
}

interface IPaginationLinkProps {
    page: number | string;
    set: (page: number) => void;
}

const config = ElementFactory.create({component: "pagination-link"});
export const PaginationLink = config.factory <IPaginationLink, IPaginationLinkProps>(({props}) => {
    const {page, set, ...p} = props;
    if (typeof page === "number") {
        return (
            <a {...p} onClick={() => set(page)}>
                {page}
            </a>
        );
    }

    return <span className="pagination-ellipsis">&hellip;</span>;
});
