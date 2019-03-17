import * as React from "react";
import {Fallback} from "./components/Fallback";
import {SessionContext} from "./store/context";
import {SessionState, SessionStatus, SessionType} from "./store/SessionState";

const Authorization = React.lazy(() => import("./authorization"));
const Application = React.lazy(() => import("./application"));

export class Entry extends React.Component {
    public static contextType = SessionContext;

    public context!: SessionType;

    public state = SessionState.getState();

    public componentDidMount() {
        if (this.context.isSigned()) {
            this.context.setState(
                SessionStatus.Authorized,
                {user: "Guest"},
            );

            this.setState(this.context.getState());
        }

        this.context.listen(
            (state) => this.setState(state),
            this,
        );
    }

    public render() {
        if (this.context.isSigned()) {
            return <Fallback/>;
        }

        return (
            <>
                <React.Suspense fallback={<Fallback/>}>
                    {this.context.isAuthorized()
                        ? <Application/>
                        : <Authorization/>
                    }
                </React.Suspense>
            </>
        );
    }
}
