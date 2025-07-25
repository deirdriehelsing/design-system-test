import type { PropsWithChildren } from 'react';
import type { TooltipProps } from '@blueshift-ui/core';

import Tooltip from '@blueshift-ui/core/dist/components/tooltip';

function TooltipWrapper({ children, ...tooltipProps }: PropsWithChildren<TooltipProps>) {
  if (!tooltipProps.title) {
    return <>{children}</>;
  }

  return (
    <Tooltip {...tooltipProps}>
      <div>{children}</div>
    </Tooltip>
  );
}

export default TooltipWrapper;
