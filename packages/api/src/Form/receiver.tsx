import * as React from "react";
import {Consumer} from "../Context";
import {IReceiverProps, IReceiverType, Omit} from "../interfaces";

export const receiver = <P extends IReceiverProps>(Receiver: IReceiverType<P>) => {
    return (props: Omit<P, "store">) => (
        <Consumer>
            {({store, version}) => (
                <Receiver {...props as any}
                          version={version}
                          store={store}/>
            )}
        </Consumer>
    );
};
