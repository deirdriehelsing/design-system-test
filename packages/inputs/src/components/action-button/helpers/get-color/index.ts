import type { ActionButtonProps } from '../../../../types';

import ActionButtonStatus from '../../constants/action-button-status';

function getColor(
  status: ActionButtonStatus,
  color?: ActionButtonProps['color'],
  disableErrorFeedback?: boolean,
  disableSuccessFeedback?: boolean
) {
  switch (true) {
    case status === ActionButtonStatus.Resolved && !disableSuccessFeedback:
      return 'success';
    case status === ActionButtonStatus.Rejected && !disableErrorFeedback:
      return 'error';
    default:
      return color;
  }
}

export default getColor;
