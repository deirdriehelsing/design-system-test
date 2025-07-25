import type { ActionButtonProps } from '../../types';
import type { ReactNode } from 'react';

import React, { useCallback } from 'react';
import AsyncActionButton from '../async-action-button';
import logHandledError from '@blueshift-ui/telemetry/dist/helpers/log-handled-error';
import useInteractionTracker from '@blueshift-ui/telemetry/dist/hooks/use-interaction-tracker';

interface CopyButtonProps
  extends Omit<
    ActionButtonProps,
    'action' | 'onCopy' | 'onError' | 'rejectedFallback' | 'resolvedFallback'
  > {
  children: React.ReactNode;
  copiedFallback?: ReactNode;
  errorFallback?: ReactNode;
  onCopy?: (value: string) => void;
  onError?: (error: unknown) => void;
  value: string;
}

function CopyButton({
  children,
  copiedFallback,
  errorFallback,
  onCopy,
  onError,
  value,
  ...buttonProps
}: CopyButtonProps) {
  const { trackEvent } = useInteractionTracker();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      trackEvent({
        action: 'copy-to-clipboard',
        category: 'copy-button',
        label: value,
      });

      onCopy?.(value);
    } catch (error) {
      logHandledError('Failed to copy to clipboard', { error });

      onError?.(error);

      throw error; // bubble error to AsyncActionButton
    }
  }, [onCopy, onError, trackEvent, value]);

  return (
    <AsyncActionButton
      action={handleCopy}
      rejectedFallback={errorFallback}
      resolvedFallback={copiedFallback}
      value={value}
      {...buttonProps}
    >
      {children}
    </AsyncActionButton>
  );
}

export default CopyButton;
