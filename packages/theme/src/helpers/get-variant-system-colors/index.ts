import type { SystemColor, Tokens } from '../../types';

import checkIsSystemColor from '../check-is-system-color';

interface GetVariantColorTokensParams {
  color: SystemColor | 'inherit' | 'default';
  defaultColor?: SystemColor;
  tokens: Tokens;
}

function getVariantSystemColors({
  color,
  defaultColor = 'primary',
  tokens,
}: GetVariantColorTokensParams) {
  if (checkIsSystemColor(color, tokens)) {
    return tokens.sys.color[color];
  }
  return tokens.sys.color[defaultColor];
}

export default getVariantSystemColors;
