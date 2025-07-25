import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';
import LineChart from '.';
import React from 'react';

(LineChart as React.FunctionComponent).displayName = 'LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Data Display/Line Chart',
  component: LineChart,
  argTypes: {
    series: {
      description:
        'An array containing the data to be ploted into the chart. Multiple series can be provided.',
    },
  },
};

type Story = StoryObj<typeof LineChart>;

const Default: Story = {
  args: {
    xAxis: [
      {
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        scaleType: 'point',
        valueFormatter: (value: number) => {
          return `${value} 2024`;
        },
      },
    ],
    series: [
      {
        area: true,
        color: '#4A48C6',
        data: [0, 0.5, 1, 3, 5, 4, 2, 4, 2],
        dataInfo: [
          '+0 that week',
          '+2 that week',
          '+3 that week',
          '+4 that week',
          '+5 that week',
          '+6 that week',
          undefined,
          '+8 that week',
          '+9 that week',
        ],
        id: 'series-a',
        valueFormatter: (value: number) => {
          return `${value} students`;
        },
      },
    ],
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: '800px', width: '600px' }}>
        <Story />
      </Box>
    ),
  ],
};

const MultipleSeries: Story = {
  args: {
    ...Default.args,
    series: [
      {
        area: true,
        color: '#4A48C6',
        data: [0, 0.5, 1, 3, 5, 4, 2, 4, 2],
        dataInfo: [
          '+0 that week',
          '+2 that week',
          '+3 that week',
          '+4 that week',
          '+5 that week',
          '+6 that week',
          '+7 that week',
          '+8 that week',
          '+9 that week',
        ],
        id: 'series-a',
        valueFormatter: (value: number) => {
          return `${value} students`;
        },
      },
      {
        area: true,
        color: '#4A48C6',
        data: [2, 1.5, 3, 5, 7, 6, 4, 6, 3],
        dataInfo: [
          '+3 that week',
          '+4 that week',
          '+5 that week',
          '+6 that week',
          '+7 that week',
          '+8 that week',
          '+9 that week',
          '+10 that week',
          '+11 that week',
        ],
        id: 'series-b',
        valueFormatter: (value: number) => {
          return `${value} students`;
        },
      },
    ],
  },
  decorators: Default.decorators,
};

export { Default, MultipleSeries };

export default meta;
