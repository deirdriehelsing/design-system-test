import type {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  ReactNode,
} from 'react';
import type { AutocompleteProps } from '@mui/material';
import type { TextFieldProps } from '../../types';

import * as styles from './index.css';
import Autocomplete from '../autocomplete';
import Chip from '@blueshift-ui/core/dist/components/chip';
import CircularProgress from '@blueshift-ui/core/dist/components/circular-progress';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@blueshift-ui/core/dist/components/stack';
import TextField from '../text-field';
import { XCircle as XCircleIcon } from '@phosphor-icons/react';

interface AutocompleteWithExternalTagsProps<Option, Key extends keyof Option & string>
  extends Omit<
    AutocompleteProps<Option, true, boolean, boolean, typeof Chip>,
    'onChange' | 'renderInput' | 'color' | 'ref'
  > {
  id: Key;
  label?: string;
  loading?: boolean;
  onChange: (newValue: Option[]) => void;
  onChangeSearch?: (newValue: string) => void;
  onClose?: () => void | Promise<void>;
  onOpen?: () => void | Promise<void>;
  onReachEnd?: () => void;
  options: Option[];
  placeholder?: string;
  searchValue?: string;
  value: Option[];
}

function AutocompleteWithExternalTags<
  Option extends Record<Key, string>,
  Key extends keyof Option & string,
>({
  id,
  label,
  loading,
  searchValue,
  onChangeSearch,
  onChange,
  onClose,
  onOpen,
  onReachEnd,
  options,
  value,
  ...props
}: AutocompleteWithExternalTagsProps<Option, Key>): ReactNode {
  function validateIfIsTypeOfOption(valueToBeChecked: unknown): valueToBeChecked is Option {
    if (!valueToBeChecked) {
      return false;
    }
    if (typeof valueToBeChecked !== 'object') {
      return false;
    }

    return id in valueToBeChecked;
  }

  function validateIfIsTypeOfOptions(valueToBeChecked: unknown): valueToBeChecked is Option[] {
    if (!Array.isArray(valueToBeChecked)) {
      return false;
    }
    if (valueToBeChecked.length === 0) {
      return true;
    }

    return validateIfIsTypeOfOption(valueToBeChecked[0]);
  }

  function onDelete(title: Option[Key]): void {
    onChange(value.filter((specificValue) => specificValue[id] !== title));
  }

  function handleSearchOnBlur(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    defaultBlurEvent: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  ): void {
    onChangeSearch?.('');
    defaultBlurEvent?.(event);
  }

  function handleSearchOnChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    defaultChangeEvent: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  ): void {
    onChangeSearch?.(event.target.value);
    defaultChangeEvent?.(event);
  }

  return (
    <>
      <Autocomplete
        {...props}
        InputProps={{
          multiple: true,
          filterSelectedOptions: true,
          value,
          loading,
          onClose,
          onOpen: () => onOpen?.(),
          renderTags: () => null,
          renderInput: (params: TextFieldProps) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    {loading && <CircularProgress size={16} />}
                    {params.InputProps?.endAdornment}
                  </InputAdornment>
                ),
              }}
              onBlur={(event) => handleSearchOnBlur(event, params.onBlur)}
              onChange={(event) => handleSearchOnChange(event, params.onChange)}
              value={searchValue ?? params.value}
            />
          ),
          ListboxProps: {
            onScroll: (event: React.SyntheticEvent) => {
              const listboxNode = event.currentTarget;
              const isScrolledToEnd =
                Math.abs(
                  listboxNode.scrollTop + listboxNode.clientHeight - listboxNode.scrollHeight
                ) < 2;

              if (isScrolledToEnd) {
                onReachEnd?.();
              }
            },
          },
          onChange: (_, newValue) => {
            if (validateIfIsTypeOfOptions(newValue)) {
              onChange(newValue);
            }
          },
          getOptionLabel: (option) => {
            if (validateIfIsTypeOfOption(option)) {
              return option[id];
            }

            return '';
          },
        }}
        label={label}
        options={options}
      />

      <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
        {value.map((specificValue) => (
          <Chip
            className={styles.chip}
            deleteIcon={<XCircleIcon className={styles.deleteIcon} size={18} weight="duotone" />}
            key={`chip-${specificValue[id]}`}
            label={specificValue[id]}
            onDelete={() => onDelete(specificValue[id])}
            size="small"
          />
        ))}
      </Stack>
    </>
  );
}

export default AutocompleteWithExternalTags;
