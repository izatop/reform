import {Column, Columns, Content, Icon, Subtitle3, TextAlign, Title1} from "@reform/bulma";
import * as React from "react";

interface INonIdealState {
    icon?: React.ReactElement | string;
    title?: string;
    children?: React.ReactNode;
}

export const NonIdealState: React.FC<INonIdealState> = (props) => (
    <Columns centered gap={false}>
        <Column narrow>
            <Content textAlign={TextAlign.Center}>
                {props.icon && (
                    <Title1>
                        {
                            typeof props.icon === "string"
                                ? <Icon size={"large"}
                                        icon={{name: props.icon, weight: "lg"}}/>
                                : props.icon
                        }
                    </Title1>
                )}
                {props.title && <Subtitle3>{props.title}</Subtitle3>}
                {props.children}
            </Content>
        </Column>
    </Columns>
);
