export type AttachFileType = "stylesheet";
export type AttachableFile = {uri: string; hash: string};
export type Attachable = Partial<Record<AttachFileType, AttachableFile[]>>;
