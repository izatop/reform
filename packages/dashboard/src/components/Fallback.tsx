import {Column, Columns, Container, Section, Title} from "@reform/components";
import * as React from "react";

export const Fallback = () => (
    <Section>
        <Container>
            <Columns is-centered>
                <Column is-narrow>
                    <Title>Loading...</Title>
                </Column>
            </Columns>
        </Container>
    </Section>
);
