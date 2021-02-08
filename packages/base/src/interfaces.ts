export type WithSuffix<T extends string, S extends string> = `${T}-${S}`;
export type MergeWithSuffix<T extends string, S extends string> = T | WithSuffix<T, S>;
export type MaybeArray<T> = T | T[];

export type ElementList = JSX.IntrinsicElements;
export type ElementKey = keyof ElementList;
