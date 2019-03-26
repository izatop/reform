import {Children, cloneElement, createContext, createElement, isValidElement, ReactElement, ReactNode} from "react";

export interface INavbarContext {
    state: boolean;
    toggle: () => void;
}

export const NavbarContext = createContext<INavbarContext>({} as INavbarContext);

const mergeClassName = (...classNames: string[]) => {
    return classNames.filter((className) => !!className)
        .join(" ");
};

export const NavbarWithChild = (children: ReactElement | {} | ReactNode): ReactNode => {
    return Children.map(children, (child) => {

        if (isValidElement<any>(child)) {
            return cloneElement<any>(
                child,
                {
                    ...child.props,
                    className: mergeClassName(child.props.className, "navbar-item"),
                },
            );
        }

        return createElement("span", {className: "navbar-item"}, child);
    });
};
