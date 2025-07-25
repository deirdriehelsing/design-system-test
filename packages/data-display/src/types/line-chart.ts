import type {
  ChartsAxisContentProps as MuiChartsAxisContentProps,
  LineChartProps as MuiLineChartProps,
  LineSeriesType as MuiLineSeriesType,
} from '@mui/x-charts';
import type { MakeOptional } from '@mui/x-charts/models/helpers';

interface ChartsAxisContentProps extends Omit<MuiChartsAxisContentProps, 'series'> {
  series: LineSeriesType[];
}

interface LineSeriesType extends MakeOptional<MuiLineSeriesType, 'type'> {
  dataInfo?: (string | undefined)[];
}

interface LineChartProps extends Omit<MuiLineChartProps, 'series'> {
  series: LineSeriesType[];
}

type LineSeriesCustomType = MakeOptional<LineSeriesType, 'type'>;

export type { ChartsAxisContentProps, LineChartProps, LineSeriesCustomType, LineSeriesType };
