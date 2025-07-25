import type { FormControlProps } from '@mui/material/FormControl';
import type { ReactNode } from 'react';
import type { ThumbsRatingValue } from './thumbs-rating-value';
import type { TooltipProps } from '@blueshift-ui/core/dist/types/tooltip-props';

interface ThumbsRatingProps extends Omit<FormControlProps, 'defaultValue' | 'onChange'> {
  defaultValue?: ThumbsRatingValue;
  disabled?: boolean;
  downTooltipProps?: Omit<TooltipProps, 'children'>;
  helperText?: string;
  id?: string;
  label?: ReactNode;
  labelId?: string;
  onChange?: (value: ThumbsRatingValue) => void;
  upTooltipProps?: Omit<TooltipProps, 'children'>;
  value?: ThumbsRatingValue;
}

export type { ThumbsRatingProps };
