import {Theme} from "@reform/com";
import {Container} from "@reform/com/container";
import {Footer} from "@reform/com/footer";
import {Section} from "@reform/com/section";
import * as React from "react";

const Layout: React.FC = ({children}) => (
    <Theme>
        <Section is:size={"large"}>
            <Container>{children}</Container>
        </Section>

        <Section>
            <Container>
                <Footer>
                    This is the page footer
                </Footer>
            </Container>
        </Section>
    </Theme>
);

export default Layout;
