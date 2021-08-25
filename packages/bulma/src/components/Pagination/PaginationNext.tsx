import * as React from "react";
import {PaginationContext} from "./props";

const {Consumer} = PaginationContext;

export const PaginationNext: React.FC = (props) => (
    <Consumer>
        {({state, set}) => {
            return <button className={"pagination-next"}
                onClick={() => !state.isLast && set(state.next)}
                disabled={state.isLast}>{props.children}</button>;
        }}
    </Consumer>
);

PaginationNext.displayName = "PaginationNext";
