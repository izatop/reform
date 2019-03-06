import {
    Breakpoint,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Color,
    Column,
    Columns,
    Container,
    Icon,
    Section,
} from "@reform/components";
import * as React from "react";
import {SessionState, SessionStatus} from "../store/SessionState";

export default class Authorization extends React.Component {
    public render() {
        return (
            <Section>
                <Container>
                    <Columns breakpoint={Breakpoint.Mobile} centered>
                        <Column className={"is-half"}>
                            <Card>
                                <CardHeader>
                                    <span>Sign In</span>
                                    <span><Icon name={"sign-in-alt"}/></span>
                                </CardHeader>
                                <CardContent>
                                    <p>To enter dashboard click this button -></p>
                                </CardContent>
                                <CardFooter>
                                    <p><Button onClick={this.enter} color={Color.Primary}
                                               fullwidth>Enter</Button></p>
                                </CardFooter>
                            </Card>
                        </Column>
                    </Columns>
                </Container>
            </Section>
        );
    }

    private enter = () => {
        SessionState.setState(SessionStatus.Authorized, {user: "Guest", token: "token"});
    }
}
