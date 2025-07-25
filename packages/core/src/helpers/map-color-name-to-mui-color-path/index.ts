import type { ColorName } from '../../types/color-name';

// This mapping is needed because of a hardcoded mapping inside MUI where a very limited set of colors is listed
// Without it, any custom color won't get mapped to the specific variant (e.g. `primary.main`) and throw an error
// The hardcoded mapping is expected to be removed on MUI v7
function mapColorNameToMuiColorPath(color: ColorName) {
  if (
    !color ||
    typeof color === 'function' ||
    typeof color === 'object' ||
    color === 'inherit' ||
    color?.includes('.') ||
    color?.startsWith('var(')
  ) {
    return color;
  }

  return `${color}.main`;
}

export default mapColorNameToMuiColorPath;
