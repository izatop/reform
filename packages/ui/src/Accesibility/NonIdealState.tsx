import {Column, Columns, Content, Icon, Subtitle3, TextAlign, Title1} from "@reform/bulma";
import * as React from "react";

interface INonIdealState {
    icon?: React.ReactElement | string;
    title?: string;
    children?: React.ReactNode;
}

export const NonIdealState: React.FC<INonIdealState> = (props) => (
    <Columns is-centered is-gap={false}>
        <Column is-narrow>
            <Content has-text-align={TextAlign.Center}>
                {props.icon && (
                    <Title1>
                        {
                            typeof props.icon === "string"
                                ? <Icon is-size={"large"}
                                        icon-weight={"lg"}
                                        icon={props.icon}/>
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
