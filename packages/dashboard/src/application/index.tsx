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
    MenuNode,
    Navbar,
    NavbarDropdown,
    NavbarLeft,
    NavbarLogo,
    NavbarMenu,
    NavbarRight,
    NavbarTab,
    Section,
} from "@reform/components";
import * as React from "react";
import {SessionContext} from "../store/context";
import {IAuthorized, SessionState, SessionType} from "../store/SessionState";
import {menu} from "./menu";
import {ComponentsRoute, ElementsRoute, FormsRoute} from "./routes";

interface IState {
    active: boolean;
    paths: MenuNode[];
}

export default class Application extends React.Component<IState> {
    public static contextType = SessionContext;

    public state: IState = {active: false, paths: []};

    public context!: SessionType<IAuthorized>;

    public componentDidMount() {
        menu.listen("change", () => {
            this.setState({paths: menu.paths()});
        });

        this.setState({paths: menu.paths()});
    }

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
                        <Column narrow>
                            <Menu store={menu}/>
                        </Column>
                        <Column>
                            <Breadcrumbs paths={this.state.paths.map(({node}) => node)} />
                            <Router>
                                <FormsRoute path={"/forms"}/>
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