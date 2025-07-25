import type { ActionButtonStatus } from '../components/action-button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

interface ActionButtonProps<TAction extends () => Promise<any> = () => Promise<any>>
  extends MuiButtonProps {
  action: TAction;
  color?: 'primary' | 'secondary';
  disableErrorFeedback?: boolean;
  disableSuccessFeedback?: boolean;
  onRejected?: (error: unknown) => void;
  onResolved?: (result: Awaited<ReturnType<TAction>>) => void;
  rejectedFallback?: ReactNode;
  resolvedFallback?: ReactNode;
  status?: ActionButtonStatus;
}

export type { ActionButtonProps };
