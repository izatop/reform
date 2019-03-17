import {Column, Columns, Icon} from "@reform/components";
import {Content, Subtitle2, Subtitle3, Title1} from "@reform/components/dist";
import * as React from "react";

interface INonIdealState {
    icon?: React.ReactElement | string;
    title?: string;
    children?: React.ReactNode;
}

export const NonIdealState: React.FC<INonIdealState> = (props) => (
    <Columns centered gap={false}>
        <Column narrow>
            <Content align={"centered"}>
                {props.icon && (
                    <Title1>
                        {
                            React.isValidElement(props.icon)
                                ? props.icon
                                : <Icon name={props.icon as string}/>
                        }
                    </Title1>
                )}
                {props.title && <Subtitle3>{props.title}</Subtitle3>}
                {props.children}
            </Content>
        </Column>
    </Columns>
);
