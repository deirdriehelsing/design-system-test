import type { RadioInputOptionsProps } from '../../../../types';

import RadioInputOption from '../radio-input-option';
import React from 'react';

function RadioInputOptions({ inputOptions, variant }: RadioInputOptionsProps) {
  return (
    <>
      {inputOptions.map((inputOption) => (
        <RadioInputOption inputOption={inputOption} key={inputOption.value} variant={variant} />
      ))}
    </>
  );
}

export default RadioInputOptions;
