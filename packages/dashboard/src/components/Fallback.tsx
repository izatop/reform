import {Column, Columns, Container, Section, Title} from "@reform/components";
import * as React from "react";

export const Fallback = () => (
    <Section>
        <Container>
            <Columns centered>
                <Column narrow>
                    <Title>Loading...</Title>
                </Column>
            </Columns>
        </Container>
    </Section>
);
