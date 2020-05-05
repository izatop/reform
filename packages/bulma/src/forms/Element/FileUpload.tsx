import * as React from "react";
import {MakeProps, XProps} from "../../interfaces";
import {IsColor, IsSize} from "../../props";
import {ConfigFactory} from "../../utils";

interface IFileUpload extends IsColor, IsSize {
    centered?: boolean;
    right?: boolean;
    fullwidth?: boolean;
    boxed?: boolean;
}

export type FileUploadProps = XProps<"input"> & {
    files?: string | string[];
    children?: string;
    label?: string;
};

const config = ConfigFactory.create({
    component: "file",
    displayName: "FileUpload",
    mutations: {
        files: "has-name",
    },
});

export const FileUpload = config.factory<MakeProps<IFileUpload>, FileUploadProps>(({props, children}) => {
    const {files, label, ...p} = props;
    return (
        <div className={p.className}>
            <label className="file-label">
                <input {...p} className={`file-input`} type="file"/>
                <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"/>
              </span>
                <span className="file-label">
                    {label || children}
                </span>
            </span>
                {files && <span className="file-name">{files}</span>}
            </label>
        </div>
    );
});
