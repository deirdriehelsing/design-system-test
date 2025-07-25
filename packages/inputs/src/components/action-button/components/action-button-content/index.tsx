import type { ActionButtonProps } from '../../../../types';

import ActionButtonStatus from '../../constants/action-button-status';

type ActionButtonContentProps = Pick<
  ActionButtonProps,
  'children' | 'rejectedFallback' | 'resolvedFallback' | 'status'
>;

function ActionButtonContent({
  children,
  rejectedFallback,
  resolvedFallback,
  status,
}: ActionButtonContentProps) {
  if (status === ActionButtonStatus.Rejected && rejectedFallback) {
    return <>{rejectedFallback}</>;
  }

  if (status === ActionButtonStatus.Resolved && resolvedFallback) {
    return <>{resolvedFallback}</>;
  }

  return <>{children}</>;
}

export default ActionButtonContent;
