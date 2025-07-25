import { baseTokens as tokens } from '@blueshift-ui/tokens';

interface GetVariantColorTokensParams {
  color: string;
  defaultColor?: string;
}

function getVariantColorTokens({ color, defaultColor = 'primary' }: GetVariantColorTokensParams) {
  // Default to 'primary' if we don't have tokens for the named color
  // TODO: improve types generated from tokens
  const paletteColors =
    (tokens.ref.palette as any)[color] ?? (tokens.ref.palette as any)[defaultColor];
  const systemColors = (tokens.sys.color as any)[color] ?? (tokens.sys.color as any)[defaultColor];

  return {
    paletteColors,
    systemColors,
  };
}

export default getVariantColorTokens;
