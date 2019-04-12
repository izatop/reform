import {FileUpload as FileUploadComponent} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";
import {IFileUpload} from "./FileUpload";

export class FilesUpload<P = {}> extends AbstractControl<FileList, P & IFileUpload> {
    public validate(value: FileList): boolean {
        if (!this.props.required) {
            return true;
        }

        return value instanceof File;
    }

    public render() {
        const files = this.value && this.value.length > 0 ?
            [...this.value].map((file) => file.name).join(", ")
            : undefined;

        return <FileUploadComponent multiple
                                    onChange={this.onChange}
                                    is-fullwidth={this.props.fullwidth}
                                    is-size={this.props.size}
                                    is-color={this.props.color}
                                    is-boxed={this.props.boxed}
                                    disabled={this.props.disabled}
                                    readOnly={this.props.readOnly}
                                    accept={this.props.accept}
                                    files={files}>
            {this.props.placeholder}
        </FileUploadComponent>;
    }

    private onChange = ({currentTarget: {files}}: React.ChangeEvent<HTMLInputElement>) => {
        if (files && files.length > 0) {
            return this.update(files);
        }

        this.update(undefined);
    }
}
