import * as React from "react";
import {ElementKey, ElementList} from "../interfaces";
import {Component} from "./Component";
import {IDeclareConfig, XElementKey, XProp} from "./interfaces";
import {getClassNameFromList, hasNotPrefix} from "./prefix";

export function declare<K extends ElementKey,
    XK extends XElementKey>(type: K, config: IDeclareConfig<XK>): React.FC<XProp<K, XK>> {
    const componentConfig = new Component(type, config);

    const fc: React.FC<XProp<K, XK>> = (props: XProp<K, XK>): React.ReactElement => {
        const next: ElementList[K] = {};
        const classNameList = componentConfig.createClassNameArray(props.className);

        for (const [property, value] of Object.entries(props)) {
            if (hasNotPrefix<Extract<keyof ElementList[K], string>>(property)) {
                next[property] = value;
                continue;
            }

            classNameList.push(...componentConfig.getModifierList(property, value));
        }

        next.className = getClassNameFromList(classNameList);

        return React.createElement(type, next);
    };

    fc.displayName = componentConfig.displayName;

    return fc;
}
