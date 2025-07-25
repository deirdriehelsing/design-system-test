import type { AutocompleteOption, AutocompleteProps, TextFieldProps } from '../../types';
import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import type { FocusEvent } from 'react';

import {
  CaretDown as CaretDownIcon,
  XCircle as CloseIcon,
  MagnifyingGlass as MagnifyingGlassIcon,
} from '@phosphor-icons/react';
import React, { useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '../text-field';
import classNames from 'clsx';
import merge from 'lodash/merge';

// Default props for the default Blueshift UI's TextField
const defaultInputProps: TextFieldProps = {
  clearable: false,
  InputProps: {
    fullWidth: true,
    startAdornment: (
      <InputAdornment position="start">
        <MagnifyingGlassIcon size="1.25rem" weight="duotone" />
      </InputAdornment>
    ),
  },
};

// Default popup icon for the Autocomplete component
const defaultPopupIcon = <CaretDownIcon size="0.88rem" weight="fill" />;

// MUI Autocomplete has a set of generic type parameters we need to pass through.
function Autocomplete<
  Option extends AutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType,
  // The generic types below are not from MUI, but custom.
  RenderInputProps extends Record<string, unknown>,
>({
  InputProps,
  allowAnyValue,
  defaultValue,
  helperText,
  label,
  options,
  popupIcon = defaultPopupIcon,
  value,
  ...formControlProps
}: AutocompleteProps<
  Option,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent,
  RenderInputProps
>) {
  const { renderInput, renderInputProps, ...muiAutocompleteProps } = InputProps ?? {};

  // Autocomplete doesn't apply form state classes by default. We have to use our own.
  const classes = {
    root: classNames({
      'Blueshift-error': formControlProps.error,
      'Blueshift-focused': formControlProps.focused,
    }),
  };

  // Input adornments and input labels don't mix well and MUI still hasn't fixed this issue: https://github.com/mui/material-ui/pull/14126
  // We need to manage the input label shrink state ourselves so it behaves in the same way as other inputs.
  const [isInputLabelShrunk, setIsInputLabelShrunk] = React.useState(
    Boolean(defaultValue || value)
  );

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setIsInputLabelShrunk(Boolean(value || event.target.value));
  }

  function handleFocus() {
    setIsInputLabelShrunk(true);
  }

  // This logic enables us to pass props to our default input without having to define `renderInput` over and over again.
  const handleRenderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      // The `renderInputProps` prop takes precedence over `defaultInputProps`, which in turn takes precedence over MUI's `params`
      const inputProps = merge(params, defaultInputProps, renderInputProps);

      const labelProps = {
        label,
        InputLabelProps: {
          className: classNames(params.InputLabelProps.className, {
            // This custom class fixes an existing issue with adornments and label alignment: https://github.com/mui/material-ui/pull/14126
            'BlueshiftUI-startAdornmentOffset': inputProps.InputProps?.startAdornment,
          }),
          shrink: isInputLabelShrunk,
        },
      };

      const props = merge(inputProps, labelProps);

      // Use Blueshift UI's TextField as the default renderInput.
      return renderInput ? renderInput(props) : <TextField {...props} />;
    },
    [isInputLabelShrunk, label, renderInput, renderInputProps]
  );

  return (
    <FormControl
      {...formControlProps}
      fullWidth
      onBlur={handleBlur}
      onFocus={handleFocus}
      variant="outlined"
    >
      <MuiAutocomplete
        classes={classes}
        clearIcon={<CloseIcon weight="fill" />}
        defaultValue={defaultValue}
        disabled={formControlProps.disabled}
        freeSolo={allowAnyValue} // This prop was renamed for clarity
        fullWidth
        options={options}
        popupIcon={popupIcon}
        renderInput={handleRenderInput}
        value={value}
        {...muiAutocompleteProps}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default Autocomplete;
