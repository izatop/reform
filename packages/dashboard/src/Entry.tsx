import * as React from "react";
import {Fallback} from "./components/Fallback";
import {SessionContext} from "./store/context";
import {SessionState, SessionStatus, SessionType} from "./store/SessionState";

const Authorization = React.lazy(() => import(/* webpackChunkName: "authorization" */ "./authorization"));

const Application = React.lazy(() => import(/* webpackChunkName: "application" */ "./application"));

export class Entry extends React.Component {
    public static contextType = SessionContext;

    public context!: SessionType;

    public state = SessionState.getState();

    public componentDidMount() {
        this.context.listen(
            (state) => this.setState(state),
            this,
        );

        if (this.context.isSigned()) {
            this.context.setState(SessionStatus.Authorized, {user: "Guest Auto"});
        }
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
