import type { BreadcrumbProps } from '../../../../types';

import TooltipWrapper from '../tooltip-wrapper';
import Typography from '@blueshift-ui/theme/dist/components/typography';

function Breadcrumb({
  component = 'div',
  componentProps,
  text,
  tooltip,
  tooltipProps,
  variant,
}: BreadcrumbProps) {
  return (
    <TooltipWrapper title={tooltip} {...tooltipProps}>
      <Typography
        tabIndex={tooltip ? 0 : undefined}
        variant={variant}
        {...componentProps}
        component={component}
      >
        {text}
      </Typography>
    </TooltipWrapper>
  );
}

export default Breadcrumb;
