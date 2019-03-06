import {ReactElement} from "react";
import {MakeProps} from "../../interfaces";

export const ModalOptions = {
    name: "modal",
    is: ["active", {clip: () => "clipped"}],
};

export type ModalProps = MakeProps<{
    clip?: boolean;
    onClose?: () => void;
    active: boolean;
    detach?: boolean;
    children: ReactElement;
}>;

export const ModalContentOptions = {
    name: "modal-content",
};

export type ModalContentProps = MakeProps;
