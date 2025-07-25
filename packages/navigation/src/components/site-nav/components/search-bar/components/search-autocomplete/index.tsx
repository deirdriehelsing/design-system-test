import type { AutocompleteOption, TextFieldProps } from '@blueshift-ui/inputs';
import type { SearchAutocompleteProps } from '../../../../../../types';

import * as styles from './index.css';
import { MagnifyingGlass as MagnifyingGlassIcon, X as XIcon } from '@phosphor-icons/react';
import Autocomplete from '@blueshift-ui/inputs/dist/components/autocomplete';
import FormControl from '@mui/material/FormControl';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';
import TextField from '@blueshift-ui/inputs/dist/components/text-field';

function SearchAutocomplete<T extends AutocompleteOption>({
  clearInput,
  getOptionLabel,
  groupBy,
  handleOptionSelection,
  inputLabel,
  inputValue,
  isLoading = false,
  noOptionsText,
  onInputBlur,
  onInputChange,
  onSubmit,
  options,
  PaperComponent,
  placeholder,
  renderGroup,
  renderOption,
  searchInputProps,
}: SearchAutocompleteProps<T>) {
  return (
    <form onSubmit={onSubmit}>
      <FormControl className={styles.formContainer} variant="outlined">
        <Autocomplete
          className={styles.autoComplete}
          InputProps={{
            clearOnBlur: false,
            disableClearable: true,
            filterOptions: (x: T[]) => x,
            forcePopupIcon: false,
            getOptionLabel,
            groupBy,
            inputValue,
            ListboxProps: {
              className: styles.searchResultContainer,
            },
            loading: isLoading,
            multiple: false,
            noOptionsText,
            onChange: handleOptionSelection,
            onInputChange,
            PaperComponent,
            renderGroup,
            renderInput: (params: TextFieldProps) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  'aria-label': inputLabel,
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: inputValue ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Clear"
                        className={styles.clearButton}
                        onClick={clearInput}
                        size="small"
                      >
                        <XIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  startAdornment: (
                    <InputAdornment aria-hidden={true} position="start">
                      <MagnifyingGlassIcon />
                    </InputAdornment>
                  ),
                }}
                onBlur={onInputBlur}
                placeholder={placeholder}
                {...searchInputProps}
              />
            ),
            renderOption,
          }}
          options={options || []}
        />
      </FormControl>
    </form>
  );
}

export default SearchAutocomplete;
