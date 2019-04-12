import {ColorType, FileUpload as FileUploadComponent, SizeType} from "@reform/components";
import * as React from "react";
import {AbstractControl} from "../AbstractControl";

export interface IFileUpload {
    readOnly?: boolean;
    disabled?: boolean;
    placeholder?: string;
    color?: ColorType;
    boxed?: boolean;
    fullwidth?: boolean;
    size?: SizeType;
}

export class FileUpload<P = {}> extends AbstractControl<File, P & IFileUpload> {
    public validate(value: File): boolean {
        if (!this.props.required) {
            return true;
        }

        return value instanceof File;
    }

    public render() {
        const files = this.value ? this.value.name : undefined;
        return <FileUploadComponent onChange={this.onChange}
                                    is-fullwidth={this.props.fullwidth}
                                    is-size={this.props.size}
                                    is-color={this.props.color}
                                    is-boxed={this.props.boxed}
                                    disabled={this.props.disabled}
                                    readOnly={this.props.readOnly}
                                    files={files}>
            {this.props.placeholder}
        </FileUploadComponent>;
    }

    private onChange = ({currentTarget: {files}}: React.ChangeEvent<HTMLInputElement>) => {
        if (files && files.length > 0) {
            return this.update(files.item(0));
        }

        this.update(undefined);
    }
}
