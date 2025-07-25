import type { BaseSelectOptionComponentProps, SelectComponentProps } from '../../../../types';
import type { Ref } from 'react';

import * as styles from './index.css';
import React, { forwardRef } from 'react';
import CustomSelectOption from './components/custom-select-option';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import SelectOptionContent from '../select-option-content';
import classNames from 'clsx';

function CustomSelect<
  TOptionComponentProps extends BaseSelectOptionComponentProps = BaseSelectOptionComponentProps,
>(
  {
    label,
    MenuProps,
    onChange,
    optionComponent = CustomSelectOption,
    optionComponentProps,
    options,
    placeholder,
    ...muiSelectProps
  }: SelectComponentProps<TOptionComponentProps> & { placeholder?: string },
  ref: Ref<HTMLInputElement | undefined>
) {
  const displayEmpty = Boolean(placeholder && !label);

  return (
    <MuiSelect
      {...muiSelectProps}
      displayEmpty={displayEmpty}
      inputRef={ref}
      label={label}
      MenuProps={{
        ...MenuProps,
        className: classNames(MenuProps?.className, styles.menu),
      }}
      onChange={onChange}
    >
      {[
        ...(!displayEmpty
          ? []
          : [
              <MenuItem
                className="BlueshiftUIMenuItem BlueshiftUIMenuItem-placeholder"
                disabled={true}
                key="placeholder-item"
                value=""
              >
                {placeholder}
              </MenuItem>,
            ]),
        ...options.map((option) => {
          const selected = option.value === muiSelectProps.value;
          return (
            <MenuItem
              className="BlueshiftUIMenuItem"
              disabled={option.disabled}
              key={option.id ?? option.value}
              value={option.value}
            >
              <SelectOptionContent
                option={option}
                optionComponent={optionComponent}
                optionComponentProps={optionComponentProps}
                selected={selected}
              />
            </MenuItem>
          );
        }),
      ]}
    </MuiSelect>
  );
}

export default forwardRef(CustomSelect);
