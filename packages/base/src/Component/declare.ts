import * as React from "react";
import {ElementKey, ElementList} from "../interfaces";
import {Component} from "./Component";
import {IDeclareConfig, XProp} from "./interfaces";
import {getClassNameFromList, hasNotPrefix} from "./prefix";

export function declare<K extends ElementKey>(type: K, config: IDeclareConfig = {}): React.FC<XProp<K>> {
    const componentConfig = new Component(type, config);

    const fc: React.FC<XProp<K>> = (props: XProp<K>): React.ReactElement => {
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

    fc.displayName = type.charAt(0).toUpperCase() + type.substr(1).toLowerCase();

    return fc;
}
