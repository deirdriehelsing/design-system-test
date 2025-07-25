import type { PaletteColor, Tokens } from '../../types';

import checkIsPaletteColor from '../check-is-palette-color';

interface GetVariantColorTokensParams {
  color: PaletteColor | 'inherit' | 'default';
  defaultColor?: PaletteColor;
  tokens: Tokens;
}

function getVariantPaletteColors({
  color,
  defaultColor = 'primary',
  tokens,
}: GetVariantColorTokensParams) {
  if (checkIsPaletteColor(color, tokens)) {
    return tokens.ref.palette[color];
  }
  return tokens.ref.palette[defaultColor];
}

export default getVariantPaletteColors;
