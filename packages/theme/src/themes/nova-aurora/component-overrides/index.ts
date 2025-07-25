import type { Tokens } from '../../../types/tokens';

import paperOverrides from './paper';

function componentOverrides(tokens: Tokens) {
  return {
    ...paperOverrides(tokens),
  };
}

export default componentOverrides;
