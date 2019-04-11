import * as React from "react";
import {FormContext} from "../Context";
import {FormOnChange, IFormProps} from "../interfaces";
import {IFormSource, Store} from "../Store";

export class Form<T extends IFormSource, P = {}> extends React.Component<IFormProps<T> & P> {
    protected store: Store<T>;

    constructor(props: IFormProps<T> & P) {
        super(props);

        this.state = {};
        this.store = (
            this.props.defaultStore as Store<T>
            || new Store<T>(this.props.defaultSource || {})
        );
    }

    public componentDidMount() {
        if (this.props.onChange) {
            const onChange = this.props.onChange as FormOnChange<T>;
            this.store.listen(() => {
                onChange(this.store);
            });
        }

        if (this.props.onMount) {
            this.props.onMount(this.store);
        }
    }

    public componentWillUnmount() {
        this.store.destroy();
        delete this.store;
    }

    public render() {
        return (
            <form style={this.props.style}
                  className={this.props.className}
                  onSubmit={this.onSubmit}
                  onReset={this.onReset}>
                <FormContext.Provider value={this.store}>
                    {this.props.children}
                </FormContext.Provider>
            </form>
        );
    }

    protected onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.store.begin();
        if (this.props.onSubmit) {
            try {
                const submitStatus = await this.props.onSubmit(this.store.toObject(), this.store);
                submitStatus
                    ? this.commit()
                    : this.unlock();
            } catch (error) {
                // tslint:disable-next-line:no-console
                console.error(error);
                this.unlock();
            }
        } else {
            this.commit();
        }
    }

    protected onReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.reset();
    }

    protected commit() {
        if (this.store) {
            this.store.commit();
        }
    }

    protected unlock() {
        if (this.store) {
            this.store.unlock();
        }
    }


    protected reset() {
        if (this.store) {
            this.store.reset();
        }
    }
}
