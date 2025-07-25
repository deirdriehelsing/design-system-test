import '@mui/material/Dialog';
import type { ElementType } from 'react';
import type { DialogActionsProps as MuiDialogActionsProps } from '@mui/material/DialogActions';
import type { DialogContentProps as MuiDialogContentProps } from '@mui/material/DialogContent';
import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import type { DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';

declare module '@mui/material/Dialog' {
  interface DialogSlots {
    /** An optional alert to go above the dialog title */
    alert?: ElementType;
  }
}

interface DialogProps extends Omit<MuiDialogProps, 'title'> {
  actions?: React.ReactNode | React.ReactNode[];
  anchor?: 'bottom';
  dialogActionsProps?: MuiDialogActionsProps;
  dialogContentProps?: MuiDialogContentProps;
  dialogTitleProps?: MuiDialogTitleProps<'div'>;
  onClose?: () => void;
  rightContent?: React.ReactNode;
  title?: React.ReactNode;
  topContent?: React.ReactNode;
  withCloseButton?: boolean;
  withDividers?: boolean;
}

export type { DialogProps };
