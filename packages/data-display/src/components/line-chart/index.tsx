import type { LineChartProps, LineSeriesCustomType } from '../../types';
import type { ElementType } from 'react';
import type { ChartsAxisContentProps as MuiChartsAxisContentProps } from '@mui/x-charts';

import * as styles from './index.css';
import { Box } from '@mui/material';
import DataTooltip from './components/data-tooltip';
import { LineChart as MuiLineChart } from '@mui/x-charts';

function LineChart({ series, xAxis, ...props }: LineChartProps) {
  const gradientStyles = series.reduce(
    (
      current: Record<string, Record<string, string>>,
      series: LineSeriesCustomType
    ): Record<string, Record<string, string>> => {
      if (!series.color) {
        return current;
      }

      current[`& .MuiAreaElement-series-${series.id}`] = {
        fill: `url('#gradient-${series.id}')`,
      };
      current[`& .MuiMarkElement-series-${series.id}`] = {
        fill: series.color,
      };

      return current;
    },
    {}
  );

  return (
    <Box className={styles.root}>
      <MuiLineChart
        {...props}
        series={series}
        slots={{
          axisContent:
            props.slots?.axisContent ?? (DataTooltip as ElementType<MuiChartsAxisContentProps>),
          ...(props.slots ?? {}),
        }}
        sx={{
          ...props.sx,
          ...gradientStyles,
        }}
        xAxis={xAxis}
      >
        <svg>
          <defs>
            {series.map((series: LineSeriesCustomType) => (
              <linearGradient
                gradientTransform="rotate(90)"
                id={`gradient-${series.id}`}
                key={series.id}
              >
                <stop
                  offset="50%"
                  stopColor={`color-mix(in srgb, ${
                    series.color || 'transparent'
                  } 50%, transparent)`}
                />
                <stop
                  offset="100%"
                  stopColor={`color-mix(in srgb, ${series.color || 'transparent'} 1%, transparent)`}
                />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </MuiLineChart>
    </Box>
  );
}

export default LineChart;
