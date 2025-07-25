import type { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

interface TextFieldEmojiMenuProps extends MuiIconButtonProps {
  onEmojiSelection?: (emoji: string) => void;
}

export type { TextFieldEmojiMenuProps };
