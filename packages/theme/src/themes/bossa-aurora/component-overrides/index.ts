import type { Tokens } from '../../../types/tokens';

import alertOverrides from './alert';
import buttonOverrides from './button';
import cardOverrides from './card';
import dialogOverrides from './dialog';
import paperOverrides from './paper';

function componentOverrides(tokens: Tokens) {
  return {
    ...alertOverrides(tokens),
    ...buttonOverrides(tokens),
    ...cardOverrides(tokens),
    ...dialogOverrides(tokens),
    ...paperOverrides(tokens),
  };
}

export default componentOverrides;
