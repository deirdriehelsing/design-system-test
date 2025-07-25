import type { AsyncActionButtonProps } from '../../types';

import ActionButton, { ActionButtonStatus } from '../action-button';
import React from 'react';

function AsyncActionButton<TAction extends () => Promise<any> = () => Promise<any>>({
  action,
  onResolved,
  onRejected,
  ...buttonProps
}: AsyncActionButtonProps<TAction>) {
  const [status, setStatus] = React.useState<ActionButtonStatus>(ActionButtonStatus.Idle);

  async function handleAction() {
    setStatus(ActionButtonStatus.Pending);

    try {
      const result = await action();
      setStatus(ActionButtonStatus.Resolved);
      onResolved?.(result);
    } catch (error) {
      setStatus(ActionButtonStatus.Rejected);
      onRejected?.(error);
    }
  }

  return <ActionButton {...buttonProps} action={handleAction} status={status} />;
}

export default AsyncActionButton;
