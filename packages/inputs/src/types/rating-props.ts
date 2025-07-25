import type { FormControlProps } from '@mui/material/FormControl';
import type { RatingProps as MuiRatingProps } from '@mui/material/Rating';

interface RatingProps
  extends Omit<
      FormControlProps,
      | 'color'
      | 'children'
      | 'error' // TODO: Remove this once prop is properly handled by component
      | 'helperText' // TODO: Remove this once prop is properly handled by component
      | 'onChange'
      | 'size'
      | 'value'
      | 'variant'
    >,
    Pick<MuiRatingProps, 'onChange' | 'readOnly' | 'size' | 'value'> {
  color?: 'default' | 'primary';
  defaultValue?: number;
  helperText?: string;
  id?: string;
  label?: string;
  labelId?: string;
}

export type { RatingProps };
