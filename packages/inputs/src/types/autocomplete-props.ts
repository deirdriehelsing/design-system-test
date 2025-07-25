import type { AutocompleteOption } from './autocomplete-option';
import type { AutocompleteValue } from '@mui/material/useAutocomplete';
import type { ChipTypeMap } from '@mui/material/Chip/Chip';
import type { FormControlProps } from '@mui/material/FormControl';
import type { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';

// MUI Autocomplete has a set of generic type parameters we need to pass through.
type AutocompleteInputProps<
  Option extends AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  // The generic types from this line below are not from MUI, but custom.
  RenderInputProps extends Record<string, unknown> = Record<string, unknown>,
> =
  // To compose this type, we first remove props that will be provided in different ways.
  Omit<
    MuiAutocompleteProps<Option, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    | 'options' // This prop is given at the top level.
    | 'renderInput' // This prop is made optional since our component has a default implementation for it (see Partial below).
    | 'color' // TODO: Remove this once prop is properly handled by component
    | 'hiddenLabel' // TODO: Remove this once prop is properly handled by component
    | 'size' // TODO: Remove this once prop is properly handled by component
    | 'freeSolo' // We're renaming this value to something more meaninful
  > &
    Partial<
      Pick<
        MuiAutocompleteProps<Option, Multiple, DisableClearable, FreeSolo, ChipComponent>,
        'renderInput'
      >
    > & {
      // And then we add our own props.
      renderInputProps?: RenderInputProps;
    };

interface AutocompleteProps<
  Option extends AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  RenderInputProps extends Record<string, unknown> = Record<string, unknown>,
> extends Omit<FormControlProps, 'children' | 'defaultValue' | 'variant'> {
  InputProps?: AutocompleteInputProps<
    Option,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent,
    RenderInputProps
  >;
  allowAnyValue?: FreeSolo;
  defaultValue?: AutocompleteValue<Option, Multiple, DisableClearable, FreeSolo>;
  helperText?: string;
  label?: string;
  options: Option[];
  popupIcon?: React.ReactNode;
  value?: AutocompleteValue<Option, Multiple, DisableClearable, FreeSolo>;
}

export type { AutocompleteProps };
