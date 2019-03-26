import * as React from "react";
import {XProps} from "../../interfaces";
import {Align, ColorType, SizeType} from "../../options";
import {MakeProps} from "../../type";
import {ElementFactory} from "../../utils";

interface IFileUpload {
    "is-align"?: Align;
    "is-color"?: ColorType;
    "is-size"?: SizeType;
    "is-centered"?: boolean;
    "is-right"?: boolean;
    "is-fullwidth"?: boolean;
    "is-boxed"?: boolean;
}

export type FileUploadProps = XProps<"input"> & {
    files?: string | string[];
    children?: string;
    label?: string;
};

const config = ElementFactory.create({
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
