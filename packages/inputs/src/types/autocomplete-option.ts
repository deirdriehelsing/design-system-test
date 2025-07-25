// MUI has a set of rules for Autocomplete options, but not a type.
// This is what it expects behind the scenes.
// See https://mui.com/material-ui/react-autocomplete/#options-structure for more info
type AutocompleteOption =
  | string
  | {
      id?: number | string;
      label: string;
    }
  | Record<string, any>; // You can use different structures by providing a `getOptionLabel` prop

export type { AutocompleteOption };
