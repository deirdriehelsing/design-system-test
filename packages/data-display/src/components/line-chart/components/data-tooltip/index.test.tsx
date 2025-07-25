import type { AxisDefaultized } from '@mui/x-charts/models/axis';
import type { ChartsTooltipClasses } from '@mui/x-charts/ChartsTooltip/chartsTooltipClasses';

import { render, screen } from '@testing-library/react';
import DataTooltip from '.';
import React from 'react';

describe('<DataTooltip />', () => {
  it('should render a tooltip for single series chart', () => {
    const axis = {
      valueFormatter: (value: string) => `${value} February`,
    } as AxisDefaultized;

    const axisData = {
      x: {
        value: 1,
      },
      y: {
        value: 1,
      },
    };

    const series = [
      {
        data: [1, 2, 3],
        id: 'series',
        dataInfo: ['+1 that week', '+2 that week', '+3 that week'],
        valueFormatter: (value: number) => `${value} students`,
      },
    ];

    render(
      <DataTooltip
        axis={axis}
        axisData={axisData}
        axisValue={undefined}
        classes={{} as ChartsTooltipClasses}
        dataIndex={1}
        series={series}
      />
    );

    expect(screen.getByText('1 February')).toBeInTheDocument();
    expect(screen.getByText('2 students')).toBeInTheDocument();
    expect(screen.getByText('+2 that week')).toBeInTheDocument();
  });

  it('should render a tooltip for multiple series chart', () => {
    const axis = {
      valueFormatter: (value: string) => `${value} March`,
    } as AxisDefaultized;

    const axisData = {
      x: {
        value: 10,
      },
      y: {
        value: 10,
      },
    };

    const series = [
      {
        data: [1, 2, 3],
        id: 'series-1',
        dataInfo: ['+1 that week', '+2 that week', '+3 that week'],
        valueFormatter: (value: number) => `${value} students`,
      },
      {
        data: [10, 20, 30],
        id: 'series-2',
        dataInfo: ['+10 that week', '+20 that week', '+30 that week'],
        valueFormatter: (value: number) => `${value} books`,
      },
    ];

    render(
      <DataTooltip
        axis={axis}
        axisData={axisData}
        axisValue={undefined}
        classes={{} as ChartsTooltipClasses}
        dataIndex={1}
        series={series}
      />
    );

    expect(screen.getByText('10 March')).toBeInTheDocument();
    expect(screen.getByText('2 students')).toBeInTheDocument();
    expect(screen.getByText('+2 that week')).toBeInTheDocument();
    expect(screen.getByText('10 March')).toBeInTheDocument();
    expect(screen.getByText('20 books')).toBeInTheDocument();
    expect(screen.getByText('+20 that week')).toBeInTheDocument();
  });
});
