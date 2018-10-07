import * as React from "react";
import {Context} from "../Context";
import {FormOnChange, IFormProps} from "../interfaces";
import {IFormSource, Store} from "../Store";

export interface IFormState {
    version: number;
    exception?: {
        error: Error;
        info: React.ErrorInfo;
    };
}

export class Form<T extends IFormSource, P = {}> extends React.Component<IFormProps<T> & P> {
    public state: IFormState;

    protected store: Store<T>;

    constructor(props: IFormProps<T> & P) {
        super(props);

        this.store = (
            this.props.defaultStore as Store<T>
            || new Store<T>(this.props.defaultSource || {})
        );

        this.state = {
            version: this.store.version,
            exception: undefined,
        };

        if (this.props.onChange) {
            const onChange = this.props.onChange as FormOnChange<T>;
            this.store.listen(() => {
                onChange(this.store);
            });
        }
    }

    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({exception: {error, info}});
    }

    public componentWillUnmount() {
        this.store.destroy();
        delete this.store;
    }

    public render() {
        if (this.state.exception) {
            const {error, info} = this.state.exception;
            return this.getExceptionView(error, info);
        }

        const {Provider} = Context;
        const {style, className} = this.props;
        const context = {store: this.store, version: this.state.version};

        return (
            <form style={style}
                  className={className}
                  onSubmit={this.onSubmit}
                  onReset={this.onReset}>
                <Provider value={context}>
                    {this.props.children}
                </Provider>
            </form>
        );
    }

    protected onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.store.begin();
        if (this.props.onSubmit) {
            try {
                const response = await this.props.onSubmit(this.store.toObject(), this.store);
                if (!response) {
                    return;
                }
            } catch (error) {
                this.setState({exception: {error}});
                return;
            }
        }

        this.commit();
    }

    protected onReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.reset();
    }

    protected commit() {
        this.setState({version: this.store.commit()});
    }

    protected reset() {
        this.setState({version: this.store.reset()});
    }

    protected getExceptionView(error: Error, info: React.ErrorInfo) {
        return (
            <div>
                <h1>{error.message}</h1>
                <p>Error stack</p>
                <pre>{error.stack}</pre>

                <p>React stack</p>
                <pre>{info.componentStack}</pre>
            </div>
        );
    }
}
