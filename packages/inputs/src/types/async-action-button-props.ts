import type { ActionButtonProps } from './action-button-props';

type AsyncActionButtonProps<TAction extends () => Promise<any> = () => Promise<any>> =
  ActionButtonProps<TAction>;

export type { AsyncActionButtonProps };
