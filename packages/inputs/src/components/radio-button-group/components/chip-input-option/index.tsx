import type { ChipProps } from '@mui/material';
import type { InputOption } from '../../../../types';
import type { Ref } from 'react';

import * as styles from './index.css';
import { Radio, useRadioGroup } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Chip from '@blueshift-ui/core/dist/components/chip';

interface ChipInputOptionProps
  extends Omit<ChipProps, 'label' | 'ref'>,
    Omit<InputOption, 'control'> {}

/**
 * Renders a Button next to an invisible Radio button so that the button can function like
 * an input control.
 */
function ChipInputOption(
  { value, label, children, ...buttonProps }: ChipInputOptionProps,
  ref: Ref<HTMLInputElement>
) {
  const radioGroup = useRadioGroup();
  const innerRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => innerRef.current!);

  return (
    <>
      <Radio className={styles.hiddenInput} inputRef={innerRef} value={value} />
      <Chip
        clickable
        label={children || label}
        onClick={() => innerRef.current?.click()}
        variant={value === radioGroup?.value ? 'filled' : 'outlined'}
        {...buttonProps}
      />
    </>
  );
}

export type { ChipInputOptionProps };

export default forwardRef(ChipInputOption);
