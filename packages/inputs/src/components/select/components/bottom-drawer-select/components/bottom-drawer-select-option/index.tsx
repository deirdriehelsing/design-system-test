import type { BaseSelectOptionComponentProps } from '../../../../../../types';

import MuiListItemText from '@mui/material/ListItemText';
import React from 'react';

function BottomDrawerSelectOption({ option }: BaseSelectOptionComponentProps) {
  return <MuiListItemText>{option.label}</MuiListItemText>;
}

export default BottomDrawerSelectOption;
