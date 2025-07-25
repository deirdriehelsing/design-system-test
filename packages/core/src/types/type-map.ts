type IsUnion<T, U = T> = T extends any ? ([U] extends [T] ? false : true) : never;

type NonUnion<T> = IsUnion<T> extends true ? never : T;

type TypeMap<M, T> = NonUnion<T> extends keyof M ? M[NonUnion<T>] : never;

export type { TypeMap };
