import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

/**
 * An interface for a button that Adds an optional "open" prop, which can be used to render the open state
 */
interface MenuTriggerProps extends MuiButtonProps {
  open?: boolean;
}

export type { MenuTriggerProps };
