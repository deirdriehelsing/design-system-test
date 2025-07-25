import type { ArgWithFilterFunction, LDClient, LDFlagSet } from '.';

type FlagArg = ArgWithFilterFunction<string, LDFlagSet | LDClient>;

export type { FlagArg };
