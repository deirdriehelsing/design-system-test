import type { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

interface TextFieldClearButtonProps extends MuiIconButtonProps {
  onClear?: () => void;
  onVisibilityChange?: (visibility: boolean) => void;
  value?: string;
}

export type { TextFieldClearButtonProps };
