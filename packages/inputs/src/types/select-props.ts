import type {
  BaseSelectOptionComponentProps,
  SelectOptionComponentProps,
} from './select-option-component-props';
import type { FormControlProps } from '@mui/material/FormControl';
import type { SelectChangeEvent } from '@mui/material';
import type { SelectOption } from './select-option';

interface SelectProps<
  TOptionComponentProps extends BaseSelectOptionComponentProps = BaseSelectOptionComponentProps,
> extends Omit<FormControlProps, 'children' | 'onChange' | 'value' | 'variant'> {
  defaultValue?: string;
  helperText?: string;
  id?: string;
  label?: string;
  labelId?: string;
  onChange?: (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLSelectElement>) => void;
  onOpen?: (event: React.SyntheticEvent<Element, Event>) => void;
  optionComponent?: React.ElementType;
  optionComponentProps?: SelectOptionComponentProps<TOptionComponentProps>;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
}

export type { SelectProps };
