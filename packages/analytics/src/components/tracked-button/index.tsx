import type { ElementType, Ref } from 'react';
import type { ButtonProps } from '@blueshift-ui/core';
import type { ClickableAndHoverableElementProps } from '../../types';

import { useElementClickedHandler, useElementHoveredHandler } from '../../hooks';
import { Button } from '@blueshift-ui/core';
import { forwardRef } from 'react';

type TrackedButtonProps<RootComponent extends ElementType> = ButtonProps<
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
function TrackedButton<RootComponent extends ElementType>(
  {
    hoverTrackingEnabled = false,
    id,
    onClick,
    onMouseEnter,
    trackedProperties,
    ...buttonProps
  }: TrackedButtonProps<RootComponent>,
  ref: Ref<HTMLButtonElement>
) {
  const handleClick = useElementClickedHandler<HTMLButtonElement>({
    onClick,
    trackedProperties: trackedProperties?.click,
  });

  const handleHover = useElementHoveredHandler<HTMLButtonElement>({
    onHover: onMouseEnter,
    trackedProperties: trackedProperties?.hover,
    trackingDisabled: !hoverTrackingEnabled,
  });

  return (
    <Button {...buttonProps} id={id} onClick={handleClick} onMouseEnter={handleHover} ref={ref} />
  );
}

export default forwardRef(TrackedButton);
