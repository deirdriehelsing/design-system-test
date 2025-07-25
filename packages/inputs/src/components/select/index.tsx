import type { BaseSelectOptionComponentProps, SelectProps } from '../../types';
import type { Ref } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';

import React, { forwardRef } from 'react';
import BottomDrawerSelect from './components/bottom-drawer-select';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react';
import CustomSelect from './components/custom-select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';
import useControlledValue from '../../hooks/use-controlled-value';

interface _SelectIcon {
  className?: string;
}

function _SelectIcon({ className }: _SelectIcon) {
  return <CaretDownIcon className={className} size="0.88rem" weight="fill" />;
}

function Select<
  TOptionComponentProps extends BaseSelectOptionComponentProps = BaseSelectOptionComponentProps,
>(
  {
    helperText,
    id,
    label,
    labelId,
    onChange,
    onOpen,
    optionComponent,
    optionComponentProps,
    options,
    placeholder,
    value: propValue,
    defaultValue = propValue === undefined ? '' : undefined, //Makes sure it doesn't switch between controlled and uncontrolled
    ...formControlProps
  }: SelectProps<TOptionComponentProps>,
  ref: Ref<HTMLInputElement | undefined>
) {
  const [controlledValue, setControlledValue] = useControlledValue<string | undefined>(
    propValue,
    defaultValue
  );

  const { isSmallViewport } = useBreakpoints();

  const SelectComponent = isSmallViewport ? BottomDrawerSelect : CustomSelect;

  function handleChange(event: SelectChangeEvent<string> | React.ChangeEvent<HTMLSelectElement>) {
    setControlledValue(event.target.value);
    onChange?.(event);
  }

  return (
    <FormControl fullWidth variant="outlined" {...formControlProps}>
      {!label ? null : (
        <InputLabel htmlFor={id} id={labelId}>
          {label}
        </InputLabel>
      )}

      <SelectComponent
        IconComponent={_SelectIcon}
        id={id}
        label={label}
        labelId={labelId}
        onChange={handleChange}
        onOpen={onOpen}
        optionComponent={optionComponent}
        optionComponentProps={optionComponentProps}
        options={options}
        placeholder={placeholder}
        ref={ref}
        value={controlledValue}
      />

      {!helperText ? null : <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export type { SelectChangeEvent };

export default forwardRef(Select);
