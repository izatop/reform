import {ConfigFactory} from "../../utils";

interface IPaginationLink {
    current?: boolean;
}

interface IPaginationLinkProps {
    page: number | string;
    set: (page: number) => void;
}

const config = ConfigFactory.create({
    component: "pagination-link",
    resolvers: {
        current: (v) => v && "is-current",
    },
});

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
