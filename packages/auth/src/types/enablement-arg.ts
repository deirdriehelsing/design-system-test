import type { ArgWithFilterFunction } from './arg-with-filter-function';
import type { Enablement } from '.';

type EnablementArg = ArgWithFilterFunction<string, Enablement[]>;

export type { EnablementArg };
