import type { BlobBorderRadiusParams } from '../../types/blob-border-radius-params';

const DEFAULT_CORNER_WEIGHT = [1, 1, 1, 1, 1, 1, 1, 1];
const DEFAULT_RANGE = [30, 60];

/**
 * Generates a random, blob-like border radius.
 **/
function generateBlobBorderRadius({
  cornerWeight = DEFAULT_CORNER_WEIGHT,
  range = DEFAULT_RANGE,
}: BlobBorderRadiusParams): string {
  let corner = 1;

  const getCorner = () => {
    const n = range[0] + Math.floor(Math.random() * (range[1] - range[0]));
    const offset = [1, 3, 6, 8].includes(corner) ? 100 : 0;
    const weight = cornerWeight[corner - 1] ?? 1;

    corner++;

    return Math.abs((offset - n) * weight);
  };

  return `
    ${getCorner()}% ${getCorner()}% ${getCorner()}% ${getCorner()}% /
    ${getCorner()}% ${getCorner()}% ${getCorner()}% ${getCorner()}%
  `;
}

export default generateBlobBorderRadius;
