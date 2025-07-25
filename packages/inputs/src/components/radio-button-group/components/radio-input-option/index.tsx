import type { InputOption, RadioButtonGroupVariant } from '../../../../types';
import type { CardInputOptionProps } from '../../../card-input-option';
import type { ChipInputOptionProps } from '../chip-input-option';

import CardInputOption from '../../../card-input-option';
import ChipInputOption from '../chip-input-option';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import React from 'react';
import { useRadioGroup } from '@mui/material';

interface RadioInputOptionProps {
  inputOption: CardInputOptionProps | ChipInputOptionProps | InputOption;
  variant?: RadioButtonGroupVariant;
}

function RadioInputOption({ inputOption, variant }: RadioInputOptionProps) {
  const radioGroup = useRadioGroup();

  switch (variant) {
    case 'cards':
      return (
        <CardInputOption
          selected={radioGroup?.value === inputOption.value}
          {...(inputOption as CardInputOptionProps)}
        />
      );
    case 'chips':
      return <ChipInputOption {...(inputOption as ChipInputOptionProps)} />;
    default:
      return (
        <FormControlLabel
          control={
            'control' in inputOption && inputOption.control ? inputOption.control : <Radio />
          }
          label={inputOption.label}
          value={inputOption.value}
        />
      );
  }
}

export type { RadioInputOptionProps };

export default RadioInputOption;
