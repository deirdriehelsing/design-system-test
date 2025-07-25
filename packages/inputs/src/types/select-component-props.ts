import type {
  BaseSelectOptionComponentProps,
  SelectOptionComponentProps,
} from './select-option-component-props';
import type { SelectProps as MuiSelectProps } from '@mui/material/Select';
import type { SelectOption } from './select-option';
import type { SelectProps } from './select-props';

interface SelectComponentProps<
  TOptionComponentProps extends BaseSelectOptionComponentProps = BaseSelectOptionComponentProps,
> extends Omit<MuiSelectProps<string>, 'defaultValue' | 'onChange'> {
  onChange: Required<SelectProps<TOptionComponentProps>>['onChange'];
  optionComponent?: React.ElementType;
  optionComponentProps?: SelectOptionComponentProps<TOptionComponentProps>;
  options: SelectOption[];
}

export type { SelectComponentProps };
