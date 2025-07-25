import type { ElementType, MouseEvent, Ref } from 'react';
import type { ClickableAndHoverableElementProps } from '../../types';
import type { IconButtonProps } from '@blueshift-ui/core';

import { useElementClickedHandler, useElementHoveredHandler } from '../../hooks';
import { IconButton } from '@blueshift-ui/core';
import { forwardRef } from 'react';

type TrackedIconButtonProps<RootComponent extends ElementType> = IconButtonProps<
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
function TrackedIconButton<RootComponent extends ElementType>(
  {
    hoverTrackingEnabled = false,
    id,
    onClick,
    onMouseEnter,
    trackedProperties,
    ...iconButtonProps
  }: TrackedIconButtonProps<RootComponent>,
  ref: Ref<HTMLButtonElement>
) {
  const handleClick = useElementClickedHandler<HTMLButtonElement>({
    onClick: onClick as (event?: MouseEvent<HTMLButtonElement>) => void,
    trackedProperties: trackedProperties?.click,
  });

  const handleHover = useElementHoveredHandler<HTMLButtonElement>({
    onHover: onMouseEnter as (event?: MouseEvent<HTMLButtonElement>) => void,
    trackedProperties: trackedProperties?.hover,
    trackingDisabled: !hoverTrackingEnabled,
  });

  return (
    <IconButton
      {...iconButtonProps}
      id={id}
      onClick={handleClick}
      onMouseEnter={handleHover}
      ref={ref}
    />
  );
}

export default forwardRef(TrackedIconButton);
