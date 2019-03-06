import * as React from "react";
import {SESSION_STORAGE_TOKEN_KEY} from "../options";

export enum SessionStatus {
    None,
    Authorized,
    Signed,
}

export interface IAuthorized {
    status: SessionStatus.Authorized;
    token: string;
    user: string;
}

export interface ISigned {
    status: SessionStatus.Signed;
    token: string;
}

export interface INone {
    status: SessionStatus.None;
}

export type IStatus = INone | ISigned | IAuthorized;

export class SessionStore<T extends IStatus = IStatus> {
    private state: IStatus = SessionStore.getInitialState();

    private listeners: Array<(state: Readonly<IStatus>) => void> = [];

    private static getInitialState(): INone | ISigned {
        const status = SessionStatus.None;
        const token = localStorage.getItem(SESSION_STORAGE_TOKEN_KEY);

        if (token) {
            return {
                status: SessionStatus.Signed,
                token,
            };
        }

        return {status};
    }

    public logout() {
        this.setState(SessionStatus.None, {});
    }

    public setState(status: SessionStatus, state: {token?: string, user?: string}) {
        this.state = Object.freeze({...this.state, status, ...state}) as IStatus;
        if (this.state.status === SessionStatus.None) {
            Reflect.deleteProperty(this.state, "user");
            Reflect.deleteProperty(this.state, "token");
            localStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
        } else {
            localStorage.setItem(SESSION_STORAGE_TOKEN_KEY, this.state.token);
        }

        this.listeners.forEach((fn) => fn(this.state));
    }

    public isSigned() {
        return this.state.status === SessionStatus.Signed;
    }

    public isAuthorized() {
        return this.state.status === SessionStatus.Authorized;
    }

    public isNone() {
        return this.state.status === SessionStatus.None;
    }

    public getState(): T {
        return this.state as T;
    }

    public listen(fn: (state: Readonly<IStatus>) => void, component?: React.Component) {
        this.listeners.push(fn);
        if (component) {
            const original = component.componentWillUnmount;
            component.componentWillUnmount = () => {
                this.removeListener(fn);
                if (original) {
                    original.call(component);
                }
            };
        }
    }

    public removeListener(fn: (state: IStatus) => void) {
        this.listeners = this.listeners
            .filter((test) => fn !== test);
    }
}

export type SessionType<T extends IStatus = IStatus> = SessionStore<T>;
export const SessionState = new SessionStore();
