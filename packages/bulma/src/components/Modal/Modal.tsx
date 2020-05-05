import * as React from "react";
import {ReactElement} from "react";
import * as ReactDOM from "react-dom";
import {MakeProps} from "../../type";
import {ClassNameResolver, ElementFactory} from "../../utils";

const MODAL_PORTAL_ID = "reform-portal-id";

interface IModalState {
    state: boolean;
}

export interface IModal {
    clipped?: boolean;
    onClose?: () => void;
    active: boolean;
    detach?: boolean;
    children: ReactElement;
}

const config = ElementFactory.createConfig({component: "modal"});

export class Modal extends React.Component<MakeProps<IModal>, IModalState> {
    public state = this.resolveState(this.props.active || false);

    private node = document.createElement("div");

    public static getDerivedStateFromProps(props: MakeProps<IModal>) {
        return {state: props.active};
    }

    private static resolvePortal(): HTMLDivElement {
        const selector = `div#${MODAL_PORTAL_ID}`;
        if (!document.querySelector(selector)) {
            const root = document.createElement("div");
            root.setAttribute("id", MODAL_PORTAL_ID);
            document.body.appendChild(root);

            return root;
        }

        return document.querySelector<HTMLDivElement>(selector)!;
    }

    public componentDidMount() {
        Modal.resolvePortal()
            .appendChild(this.node);
    }

    public componentWillUnmount() {
        Modal.resolvePortal()
            .removeChild(this.node);
    }

    public render() {
        if (!this.state.state && this.props.detach) {
            return null;
        }

        const className = ClassNameResolver.resolveClassName(
            {
                ...this.props,
                active: this.state.state,
            },
            config,
        );

        return ReactDOM.createPortal(
            <div className={className}>
                <div className="modal-background" onClick={this.close}/>
                {this.getContent()}
                <button onClick={this.close} className="modal-close is-large" aria-label="close"/>
            </div>,
            this.node,
        );
    }

    private getContent() {
        if (React.isValidElement(this.props.children)) {
            return this.props.children;
        }

        return;
    }

    private resolveState(state: boolean) {
        return {state};
    }

    private close = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };
}
