import * as React from "react";
import {calcClasses} from "../../helpers";
import {MakeProps} from "../../interfaces";

export type TitleSize = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleProps = MakeProps<{children: React.ReactNode, spaced?: boolean, anchor?: string}>;
export type TitleFactory = (props: React.PropsWithoutRef<TitleProps>) => React.ReactElement;
export const createTitle = (name: string, size: TitleSize, factory: TitleFactory) => (
    (props: TitleProps) => {
        const titleProps = {
            className: calcClasses({...props, size}, {
                name,
                is: ["spaced"],
            }),
            id: props.anchor,
            children: props.children,
        };

        return React.cloneElement(factory(props), titleProps);
    }
);
