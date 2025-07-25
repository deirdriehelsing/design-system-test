type ArgWithFilterFunction<TArgType, TCallbackParams> =
  | TArgType
  | ((params: TCallbackParams) => boolean);

export type { ArgWithFilterFunction };
