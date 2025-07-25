import type { PaletteColor, Tokens } from '../../types';

function checkIsPaletteColor(color: PaletteColor | string, tokens: Tokens): color is PaletteColor {
  return color in tokens.ref.palette;
}

export default checkIsPaletteColor;
