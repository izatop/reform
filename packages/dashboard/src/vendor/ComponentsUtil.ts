import * as React from "react";

export class ComponentsUtil {
    public static attach(component: React.Component, dispose: () => void) {
        const componentWillUnmount = component.componentWillUnmount;
        component.componentWillUnmount = () => {
            if (componentWillUnmount) {
                componentWillUnmount.call(component);
            }

            dispose();
        };
    }
}
