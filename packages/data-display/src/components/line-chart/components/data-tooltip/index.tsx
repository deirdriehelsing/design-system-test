import type { ChartsAxisContentProps, LineSeriesType } from '../../../../types';

import * as styles from './index.css';
import { Box } from '@mui/material';
import Typography from '@blueshift-ui/theme/dist/components/typography';

function getInfo({ label, dataInfo }: LineSeriesType, dataIndex?: number | null) {
  const labelText = typeof label === 'function' ? label('tooltip') : (label ?? '');
  return dataInfo && (dataIndex || dataIndex === 0) ? dataInfo[dataIndex] : labelText;
}

function DataTooltip({ axis, axisData, dataIndex, series }: ChartsAxisContentProps) {
  return (
    <Box className={styles.tooltip}>
      <Typography className={styles.tooltipLabel}>
        {axis.valueFormatter?.(axisData.x?.value ?? '', { location: 'tick' })}
      </Typography>
      {series.map((seriesData, index) => {
        const value = dataIndex || dataIndex === 0 ? seriesData.data?.[dataIndex] : '';
        const info = getInfo(seriesData, dataIndex);

        return (
          <Box key={seriesData.id ?? index}>
            <Typography className={styles.tooltipValue}>
              {value || value === 0
                ? seriesData.valueFormatter?.(value, { dataIndex: dataIndex ?? 0 })
                : 'No data found'}
            </Typography>
            {info && (
              <Box>
                <Typography className={styles.tooltipInfo} variant="bodySmall">
                  {info}
                </Typography>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default DataTooltip;
