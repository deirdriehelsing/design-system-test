import type { PieChartProps } from '../../types';

import * as styles from './index.css';
import { Box } from '@mui/material';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';

function PieChart(props: PieChartProps) {
  const { isSmallViewport } = useBreakpoints();

  return (
    <Box className={styles.root}>
      <MuiPieChart
        slotProps={{
          legend: {
            hidden: isSmallViewport,
            labelStyle: {
              fontSize: '1rem',
              ...props.slotProps?.legend?.labelStyle,
            },
            ...props.slotProps?.legend,
          },
          pieArcLabel: {
            fontSize: '1rem',
            ...props.slotProps?.pieArcLabel,
          },
          ...props.slotProps,
        }}
        {...props}
      />
    </Box>
  );
}

export default PieChart;
