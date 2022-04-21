import {DefaultTreeAdapterMap} from "parse5";

export type P5TypeMap = DefaultTreeAdapterMap;
export type P5Pick<K extends keyof P5TypeMap> = P5TypeMap[K];
