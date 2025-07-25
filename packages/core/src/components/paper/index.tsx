import type { PaperColorVariant, PaperProps } from '../../types';
import type { Ref } from 'react';

import MuiPaper from '@mui/material/Paper';
import TypeSafeForwardRef from '../../helpers/type-safe-forward-ref';
import filterCustomProps from '../../helpers/filter-custom-props';
import { useMemo } from 'react';

function Paper<T extends PaperColorVariant = 'bordered'>(
  muiPaperProps: PaperProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const CustomPropsFilter = useMemo(
    () => filterCustomProps(['accentColor', 'colorVariant'], muiPaperProps.component ?? 'div'),
    [muiPaperProps.component]
  );

  return <MuiPaper {...muiPaperProps} component={CustomPropsFilter} ref={ref} />;
}

export default TypeSafeForwardRef(Paper);
