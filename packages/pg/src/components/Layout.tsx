import {Theme} from "@reform/com";
import {Footer} from "@reform/com/footer";
import {Section} from "@reform/com/section";
import * as React from "react";

const Layout: React.FC = ({children}) => (
    <Theme>
        <Section>{children}</Section>

        <Footer>
            This is the page footer
        </Footer>
    </Theme>
);

export default Layout;
