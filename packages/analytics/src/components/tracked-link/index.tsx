import type { ElementType, Ref } from 'react';
import type { ClickableAndHoverableElementProps } from '../../types';
import type { LinkProps } from '@blueshift-ui/core';

import { useElementClickedHandler, useElementHoveredHandler } from '../../hooks';
import Link from '@blueshift-ui/core/dist/components/link';
import { forwardRef } from 'react';

type TrackedLinkProps<RootComponent extends ElementType> = LinkProps<
  RootComponent,
  ClickableAndHoverableElementProps & {
    component?: RootComponent;
    hoverTrackingEnabled?: boolean;
    id: string;
  }
>;

/**
 * @deprecated this component will be removed in v5. Use the event handler hooks instead.
 */
function TrackedLink<RootComponent extends ElementType>(
  {
    hoverTrackingEnabled = false,
    id,
    onClick,
    onMouseEnter,
    trackedProperties,
    ...linkProps
  }: TrackedLinkProps<RootComponent>,
  ref: Ref<HTMLAnchorElement>
) {
  const handleClick = useElementClickedHandler<HTMLAnchorElement>({
    onClick,
    trackedProperties: trackedProperties?.click,
  });

  const handleHover = useElementHoveredHandler<HTMLAnchorElement>({
    onHover: onMouseEnter,
    trackedProperties: trackedProperties?.hover,
    trackingDisabled: !hoverTrackingEnabled,
  });

  return <Link {...linkProps} id={id} onClick={handleClick} onMouseEnter={handleHover} ref={ref} />;
}

export default forwardRef(TrackedLink);
