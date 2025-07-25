import type { BaseSelectOptionComponentProps } from '../../../../../../types';

import React from 'react';

function CustomSelectOption({ option }: BaseSelectOptionComponentProps) {
  return <>{option.label}</>;
}

export default CustomSelectOption;
