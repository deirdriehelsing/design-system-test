import type { BlobBorderRadiusParams } from '../../types/blob-border-radius-params';

import { useEffect, useState } from 'react';
import generateBlobBorderRadius from '../../helpers/generate-blob-border-radius';

function useBlobBorderRadius({
  animated = false,
  animationDuration = 5000,
  cornerWeight,
  range,
}: BlobBorderRadiusParams = {}): string {
  const [borderRadius, setBorderRadius] = useState(
    generateBlobBorderRadius({ cornerWeight, range })
  );

  useEffect(() => {
    if (!animated) {
      return;
    }

    const interval = setInterval(() => {
      setBorderRadius(generateBlobBorderRadius({ cornerWeight, range }));
    }, animationDuration);

    // cleanup
    return () => clearInterval(interval);
  }, [animated, animationDuration, cornerWeight, range]);

  return borderRadius;
}

export default useBlobBorderRadius;
