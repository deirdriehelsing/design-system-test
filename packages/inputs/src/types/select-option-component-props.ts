import type { SelectOption } from './select-option';

interface BaseSelectOptionComponentProps {
  option: SelectOption;
  selected: boolean;
}

type SelectOptionComponentProps<TOptionComponentProps> =
  | TOptionComponentProps
  | ((option: SelectOption, selected: boolean) => TOptionComponentProps);

export type { BaseSelectOptionComponentProps, SelectOptionComponentProps };
