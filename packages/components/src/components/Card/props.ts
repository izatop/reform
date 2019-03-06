import {cloneElement, createElement, isValidElement, ReactElement, ReactNode} from "react";
import {mergeProps} from "../../helpers";
import {MakeProps} from "../../interfaces";

export const CardOptions = {
    name: "card",
};

export type CardProps = MakeProps<{
    children: ReactElement[] | ReactElement;
}>;

export const CardHeaderOptions = {
    name: "card-header",
};

export type CardHeaderProps = MakeProps<{
    children: ReactNode | [ReactNode, ReactNode];
}>;

/**
 * @private
 * @param props
 * @param child
 */
export const renderCardChild = (props: object, child?: React.ReactNode) => {
    if (child && isValidElement<any>(child)) {
        return cloneElement(child, mergeProps(child.props, props));
    }

    if (child) {
        return createElement("p", props, child);
    }
};
