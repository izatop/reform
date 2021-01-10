import {Footer} from "@reform/com/footer";
import {Section} from "@reform/com/section";
import * as React from "react";

const Layout: React.FC = ({children}) => (
    <>
        <Section>{children}</Section>

        <Footer>
            This is the page footer
        </Footer>
    </>
);

export default Layout;
