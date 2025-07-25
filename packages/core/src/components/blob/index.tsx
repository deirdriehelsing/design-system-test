import type { ElementType, PropsWithChildren } from 'react';
import type { BlobBorderRadiusParams } from '../../types';

import useBlobBorderRadius from '../../hooks/use-blob-border-radius';

interface BlobProps extends PropsWithChildren<BlobBorderRadiusParams> {
  component?: ElementType;
  componentProps?: Record<string, any>;
}

function Blob({
  animated,
  animationDuration = 5000,
  children,
  component: Component = 'div',
  componentProps,
  cornerWeight,
  range,
}: BlobProps) {
  const blobBorderRadius = useBlobBorderRadius({
    animated,
    animationDuration,
    cornerWeight,
    range,
  });
  return (
    <Component
      {...componentProps}
      style={{
        ...componentProps?.style,
        borderRadius: blobBorderRadius,
        transition: animated ? `border-radius ${animationDuration}ms ease` : undefined,
      }}
    >
      {children}
    </Component>
  );
}

export default Blob;
