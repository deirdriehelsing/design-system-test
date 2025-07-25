import type { CardInputOptionProps } from './card-input-option-props';
import type { ChipProps } from '@mui/material';
import type { InputOption } from './input-option';

interface ChipInputOptionProps
  extends Omit<ChipProps, 'label' | 'ref'>,
    Omit<InputOption, 'control'> {}

type RadioButtonGroupVariant = 'default' | 'cards' | 'chips';

interface RadioInputOptionsProps {
  inputOptions: CardInputOptionProps[] | ChipInputOptionProps[] | InputOption[];
  variant?: RadioButtonGroupVariant;
}

export type { ChipInputOptionProps, RadioButtonGroupVariant, RadioInputOptionsProps };
