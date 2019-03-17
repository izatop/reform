import * as React from "react";
import {Align, Color, Size} from "../../enum";
import {Helpers} from "../../helpers";
import {MakeProps} from "../../interfaces";

export type FileUploadProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

export interface IFileUploadProps extends MakeProps {
    props?: FileUploadProps;
    color?: Color;
    size?: Size;
    disabled?: boolean;
    name?: string;
    children?: string;
    align?: Align;
    fullwidth?: boolean;
    multiple?: boolean;
    box?: boolean;
}

const FileUploadOptions = {
    name: "file",
    has: [{name: () => "name"}],
    is: ["fullwidth", "align", "color", "size", {box: () => "boxed"}],
};

const FileUploadInputOptions = {
    name: "file-input",
};

export const FileUpload: React.FC<IFileUploadProps> = (props) => (
    <div className={Helpers.calcClasses(props, FileUploadOptions)}>
        <label className="file-label">
            <input type="file"
                   multiple={props.multiple}
                   {...Helpers.calcProps(props, FileUploadInputOptions)}/>
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"/>
              </span>
                <span className="file-label">
                    {props.children}
                </span>
            </span>
            {props.name && <span className="file-name">{props.name}</span>}
        </label>
    </div>
);

FileUpload.displayName = "FileUpload";
