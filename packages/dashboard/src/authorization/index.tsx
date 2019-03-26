import {
    Breakpoint,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardHeaderIcon,
    CardHeaderTitle,
    Color,
    Column,
    Columns,
    Container,
    Section,
} from "@reform/components";
import * as React from "react";
import {SessionState, SessionStatus} from "../store/SessionState";

export default class Authorization extends React.Component {
    public render() {
        return (
            <Section>
                <Container>
                    <Columns is-breakpoint={Breakpoint.Mobile} is-centered>
                        <Column is-narrow>
                            <Card>
                                <CardHeader>
                                    <CardHeaderTitle>Sign In</CardHeaderTitle>
                                    <CardHeaderIcon icon={"sign-in-alt"}/>
                                </CardHeader>
                                <CardContent>
                                    <p>To enter dashboard click this button -></p>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={this.enter} color={Color.Primary}
                                            is-fullwidth>Enter</Button>
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
