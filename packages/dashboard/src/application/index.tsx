import {Link, Router} from "@reach/router";
import {
    Breadcrumbs,
    Button,
    ButtonSize,
    Color,
    Column,
    Columns,
    Icon,
    Menu,
    Navbar,
    NavbarDropdown,
    NavbarLeft, NavbarLogo,
    NavbarMenu,
    NavbarRight,
    Section,
} from "@reform/components";
import {NavbarTab} from "@reform/components/dist/components/Navbar/NavbarTab";
import * as React from "react";
import {SessionContext} from "../store/context";
import {IAuthorized, SessionState, SessionType} from "../store/SessionState";
import {menu} from "./menu";
import {ComponentsRoute, ElementsRoute} from "./routes";

export default class Application extends React.Component {
    public static contextType = SessionContext;

    public state = {active: false};

    public context!: SessionType<IAuthorized>;

    public render() {
        return (
            <>
                <Navbar shadow>
                    <NavbarLogo>
                        <p>Hello, {this.context.getState().user}</p>
                    </NavbarLogo>
                    <NavbarMenu>
                        <NavbarLeft>
                            <NavbarDropdown>
                                <p>
                                    <Button size={ButtonSize.Small}
                                            color={Color.Warning}>
                                        <Icon name={"bell"}/>
                                        <span>5</span>
                                    </Button>
                                </p>
                                <p>No new message</p>
                            </NavbarDropdown>
                            <NavbarTab active><Link to={"/"}>Dashboard</Link></NavbarTab>
                            <NavbarTab><Link to={"/"}>Account Settings</Link></NavbarTab>
                        </NavbarLeft>
                        <NavbarRight>
                            <p>
                                <Button onClick={() => SessionState.logout()}
                                        color={Color.Grey}>Logout</Button>
                            </p>
                        </NavbarRight>
                    </NavbarMenu>
                </Navbar>
                <Section>
                    <Columns>
                        <Column span={3}>
                            <Menu store={menu}/>
                        </Column>
                        <Column>
                            <Breadcrumbs>
                                <Link to={"/"}><Icon name={"home"}/><span>Dashboard</span></Link>
                                <a><span>Page Name</span></a>
                            </Breadcrumbs>
                            <Router>
                                <ElementsRoute path={"/elements"}/>
                                <ComponentsRoute path={"/components"}/>
                            </Router>
                        </Column>
                    </Columns>
                </Section>
            </>
        );
    }
}
