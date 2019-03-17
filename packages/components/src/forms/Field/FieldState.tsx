import * as React from "react";

export interface IFieldStateProps {
    state?: boolean;
}

export const FieldState: React.FC<IFieldStateProps> = (props) => (
    <fieldset disabled={props.state === false}>{props.children}</fieldset>
);

FieldState.displayName = "FieldState";
