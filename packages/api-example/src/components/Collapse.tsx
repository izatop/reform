import * as React from "react";

export class Collapse extends React.Component<{ state?: boolean }> {
    public state = {state: this.props.state};

    render() {
        return (
            <div className={"collapse"}>
                <div className={`${!this.state.state ? "hide" : "show"}`}>
                    {this.props.children}
                </div>

                <div className={"footer"}>
                    <a href={"#"} onClick={e => {
                        e.preventDefault();
                        this.setState({state: !this.state.state})
                    }}>{!this.state.state ? "More code" : "Less code"}</a>
                </div>
            </div>
        )
    }
}
