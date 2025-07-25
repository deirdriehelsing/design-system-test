import type { TooltipProps } from '../../types';

import MuiTooltip from '@mui/material/Tooltip';

function Tooltip(props: TooltipProps) {
  return <MuiTooltip {...props} />;
}

export default Tooltip;
