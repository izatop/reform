import * as React from "react";
import {PaginationContext} from "./props";

const {Consumer} = PaginationContext;

export const PaginationPrevious: React.FC = (props) => (
    <Consumer>
        {({state, set}) => {
            return <button className={"pagination-previous"}
                           onClick={() => !state.isFirst && set(state.previous)}
                           disabled={state.isFirst}>{props.children}</button>;
        }}
    </Consumer>
);
