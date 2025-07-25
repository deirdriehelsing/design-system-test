import type { PropsWithChildren } from 'react';
import type { TooltipProps } from '../../../../types';

import Tooltip from '../../../tooltip';

interface TooltipWrapper extends PropsWithChildren<Omit<TooltipProps, 'title'>> {
  title?: TooltipProps['title'];
}

function TooltipWrapper({ children, title, ...tooltipProps }: TooltipWrapper) {
  if (title) {
    return (
      <Tooltip title={title} {...tooltipProps}>
        <span>{children}</span>
      </Tooltip>
    );
  }

  return <>{children}</>;
}

export default TooltipWrapper;
