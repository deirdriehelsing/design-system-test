import type { ActionButtonProps } from '../../types';

import * as styles from './index.css';
import React, { useCallback, useEffect } from 'react';
import ActionButtonContent from './components/action-button-content';
import ActionButtonStatus from './constants/action-button-status';
import Button from '@blueshift-ui/core/dist/components/button';
import CircularProgress from '@blueshift-ui/core/dist/components/circular-progress';
import WAIT_DURATION from './constants/wait-duration';
import clsx from 'clsx';
import getCircularProgressSize from './helpers/get-circular-progress-size';
import getColor from './helpers/get-color';

function ActionButton({
  action,
  children,
  className: givenClassName,
  color: givenColor,
  disabled,
  disableErrorFeedback,
  disableSuccessFeedback,
  onClick,
  onRejected,
  onResolved,
  rejectedFallback,
  resolvedFallback,
  size = 'medium',
  status = ActionButtonStatus.Idle,
  ...buttonProps
}: ActionButtonProps) {
  const [currentStatus, setCurrentStatus] = React.useState<ActionButtonStatus>(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [setCurrentStatus, status]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);

      action().then(onResolved).catch(onRejected);
    },
    [action, onClick, onRejected, onResolved]
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if ([ActionButtonStatus.Resolved, ActionButtonStatus.Rejected].includes(currentStatus)) {
      timeout = setTimeout(() => setCurrentStatus(ActionButtonStatus.Idle), WAIT_DURATION);
    }

    return () => clearTimeout(timeout);
  }, [currentStatus]);

  return (
    <Button
      {...buttonProps}
      className={clsx(styles.root, givenClassName, {
        [styles.rejected]: !disableErrorFeedback && status === ActionButtonStatus.Rejected,
      })}
      color={getColor(currentStatus, givenColor, disableErrorFeedback, disableSuccessFeedback)}
      disabled={disabled || currentStatus === ActionButtonStatus.Pending}
      onClick={handleClick}
      size={size}
    >
      {currentStatus === ActionButtonStatus.Pending && (
        <CircularProgress
          className={styles.loadingIndicator}
          size={getCircularProgressSize(size)}
        />
      )}
      <span className={styles.buttonText}>
        <ActionButtonContent
          rejectedFallback={rejectedFallback}
          resolvedFallback={resolvedFallback}
          status={currentStatus}
        >
          {children}
        </ActionButtonContent>
      </span>
    </Button>
  );
}

export default ActionButton;

export { ActionButtonStatus };
