import type { SystemColor, Tokens } from '../../types';

function checkIsSystemColor(color: SystemColor | string, tokens: Tokens): color is SystemColor {
  return color in tokens.sys.color && !['action', 'text', 'background'].includes(color as string);
}

export default checkIsSystemColor;
