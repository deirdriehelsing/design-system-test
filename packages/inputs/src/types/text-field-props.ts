import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

// Needs to be a type and not an interface because of MuiTextFieldProps's implementation
// From TypeScript: "An interface can only extend an object type or intersection of object types with statically known members. ts(2312)"
type TextFieldProps = Omit<MuiTextFieldProps, 'variant'> & {
  clearable?: boolean;
  gradient?: boolean;
  onClear?: () => void;
  onEmojiSelection?: (emoji: string) => void;
  value?: string;
  withEmojiMenu?: boolean;
};

export type { TextFieldProps };
