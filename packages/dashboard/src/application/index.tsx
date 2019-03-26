import {Link, Router} from "@reach/router";
import {
    Breadcrumbs,
    Button,
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
import {NavbarLink} from "@reform/components/dist/components/Navbar/NavbarLink";
import * as React from "react";
import {SessionContext} from "../store/context";
import {IAuthorized, SessionState, SessionType} from "../store/SessionState";
import {ComponentsUtil} from "../vendor/ComponentsUtil";
import {menu} from "./menu";
import {ComponentsRoute, ElementsRoute, FormsControlledRoute, FormsRoute} from "./routes";

interface IState {
    active: boolean;
    paths: MenuNode[];
}

export default class Application extends React.Component<{}, IState> {
    public static contextType = SessionContext;

    public state: IState = {active: false, paths: menu.paths()};

    public context!: SessionType<IAuthorized>;

    public componentDidMount() {
        ComponentsUtil.attach(this, menu.listen("change", this.onMenuChange));
    }

    public render() {
        return (
            <>
                <Navbar has-shadow>
                    <NavbarLogo>
                        <p>Hello, {this.context.getState().user}</p>
                    </NavbarLogo>
                    <NavbarMenu>
                        <NavbarLeft>
                            <NavbarDropdown>
                                <NavbarLink is-arrowless>
                                    <Button is-size={"small"}
                                            is-color={Color.Warning}>
                                        <Icon icon={"bell"}/>
                                        <span>5</span>
                                    </Button>
                                </NavbarLink>
                                <p>No new message</p>
                            </NavbarDropdown>
                            <NavbarTab is-active><Link to={"/"}>Dashboard</Link></NavbarTab>
                            <NavbarTab><Link to={"/"}>Account Settings</Link></NavbarTab>
                        </NavbarLeft>
                        <NavbarRight>
                            <p>
                                <Button onClick={() => SessionState.logout()}
                                        is-color={Color.Grey}>Logout</Button>
                            </p>
                        </NavbarRight>
                    </NavbarMenu>
                </Navbar>
                <Section>
                    <Columns>
                        <Column is-narrow>
                            <Menu store={menu}/>
                        </Column>
                        <Column>
                            <Breadcrumbs paths={this.state.paths.map(({node}) => node)}/>
                            <Router>
                                <FormsRoute path={"/forms"}/>
                                <ElementsRoute path={"/elements"}/>
                                <ComponentsRoute path={"/components"}/>
                                <FormsControlledRoute path={"/forms/controlled"}/>
                            </Router>
                        </Column>
                    </Columns>
                </Section>
            </>
        );
    }

    private onMenuChange = () => {
        this.setState({paths: menu.paths()});
    }
}
