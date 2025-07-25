import type { Meta, StoryObj } from '@storybook/react';

import PieChart from '.';

const meta: Meta<typeof PieChart> = {
  component: PieChart,
  title: 'Data Display/Pie Chart',
  parameters: {
    docs: {
      description: {
        component: 'Pie charts express portions of a whole, using arcs or angles within a circle.',
      },
    },
  },
  argTypes: {
    series: {
      control: 'object',
      description: 'The series to display in the pie chart. An array of PieSeriesType objects.',
      table: {
        type: { summary: 'Array<object>' },
        defaultValue: { summary: 'required' },
      },
    },
    colors: {
      control: 'object',
      description: 'Color palette used to colorize multiple series.',
      table: {
        type: { summary: 'Array<string> | func' },
        defaultValue: { summary: 'rainbowSurgePalette' },
      },
    },
    height: {
      control: { type: 'number', min: 200, max: 600, step: 50 },
      description:
        'The height of the chart in px. If not defined, it takes the height of the parent element.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'If true, a loading overlay is displayed.',
      table: {
        type: { summary: 'bool' },
        defaultValue: { summary: 'false' },
      },
    },
    margin: {
      control: 'object',
      description:
        "The margin between the SVG and the drawing area. It's used for leaving some space for extra information such as the x- and y-axis or legend.",
      table: {
        type: {
          summary: 'number | { bottom?: number, left?: number, right?: number, top?: number }',
        },
        defaultValue: { summary: 'undefined' },
      },
    },
    onItemClick: {
      action: 'item-clicked',
      description: 'Callback fired when a pie arc is clicked.',
      table: {
        type: { summary: 'func' },
        defaultValue: { summary: 'undefined' },
      },
    },
    skipAnimation: {
      control: 'boolean',
      description:
        "If true, animations are skipped. If unset or false, the animations respects the user's prefers-reduced-motion setting.",
      table: {
        type: { summary: 'bool' },
        defaultValue: { summary: 'undefined' },
      },
    },
    slotProps: {
      control: 'object',
      description: 'The props used for each component slot.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    slots: {
      control: 'object',
      description: 'Overridable component slots.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    width: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description:
        'The width of the chart in px. If not defined, it takes the width of the parent element.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

type Story = StoryObj<typeof PieChart>;

// Sample data for various stories
const basicData = [
  { id: 0, value: 35, label: 'Mathematics' },
  { id: 1, value: 25, label: 'Science' },
  { id: 2, value: 20, label: 'Reading' },
  { id: 3, value: 15, label: 'Writing' },
  { id: 4, value: 5, label: 'Other' },
];

const operatingSystemData = [
  { id: 0, value: 72.72, label: 'Windows' },
  { id: 1, value: 16.38, label: 'OS X' },
  { id: 2, value: 3.83, label: 'Linux' },
  { id: 3, value: 2.42, label: 'Chrome OS' },
  { id: 4, value: 4.65, label: 'Other' },
];

const Default: Story = {
  args: {
    series: [{ data: basicData }],
    width: 450,
    height: 200,
  },
};

const DonutChart: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A donut chart is essentially a pie chart with a hollow center. Set innerRadius > 0 to create a donut chart.',
      },
    },
  },
  args: {
    series: [
      {
        data: basicData,
        innerRadius: 20,
        outerRadius: 100,
        arcLabel: 'value',
      },
    ],
    width: 400,
    height: 200,
  },
};

const WithColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Colors can be customized using a color palette or individual color properties on data items.',
      },
    },
  },
  args: {
    series: [
      {
        data: [
          { id: 0, value: 40, label: 'Active Time', color: '#4CAF50' },
          { id: 1, value: 30, label: 'Break Time', color: '#FF9800' },
          { id: 2, value: 20, label: 'Study Time', color: '#2196F3' },
          { id: 3, value: 10, label: 'Other', color: '#9C27B0' },
        ],
      },
    ],
    width: 400,
    height: 200,
  },
};

const WithColorPalette: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the colors prop to provide a color palette for the entire chart.',
      },
    },
  },
  args: {
    series: [{ data: basicData }],
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    width: 400,
    height: 200,
  },
};

const CustomSizing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Customize the pie chart shape with various sizing properties like padding, corner radius, and angles.',
      },
    },
  },
  args: {
    series: [
      {
        data: basicData,
        innerRadius: 10,
        outerRadius: 90,
        paddingAngle: 5,
        cornerRadius: 5,
        startAngle: -45,
        endAngle: 225,
        cx: 100,
        cy: 100,
      },
    ],
    width: 400,
    height: 200,
  },
};

const WithLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Display labels on the arcs using the arcLabel property. Labels can show values, formatted values, or custom content.',
      },
    },
  },
  args: {
    series: [
      {
        data: operatingSystemData,
        arcLabel: (item) => `${item.value}%`,
        arcLabelMinAngle: 35,
        arcLabelRadius: '60%',
      },
    ],
    width: 400,
    height: 200,
  },
};

const FormattedValueLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use "formattedValue" to display labels with custom formatting.',
      },
    },
  },
  args: {
    series: [
      {
        data: basicData,
        arcLabel: 'formattedValue',
        valueFormatter: (item) => `${item.value}pts`,
      },
    ],
    width: 400,
    height: 200,
  },
};

const WithHighlight: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Add highlighting and fading effects when hovering over pie slices. Hover over the slices to see the effect.',
      },
    },
  },
  args: {
    series: [
      {
        data: operatingSystemData,
        highlightScope: { fade: 'global', highlight: 'item' },
        faded: {
          innerRadius: 10,
          additionalRadius: -30,
          color: 'gray',
        },
        valueFormatter: (value) => `${value}%`,
      },
    ],
    width: 450,
    height: 200,
  },
};

const AdvancedHighlight: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Advanced highlighting with custom highlighted and faded states.',
      },
    },
  },
  args: {
    series: [
      {
        data: basicData,
        highlightScope: { fade: 'global', highlight: 'item' },
        highlighted: {
          additionalRadius: 10,
        },
        faded: {
          additionalRadius: -5,
          color: '#E0E0E0',
        },
      },
    ],
    width: 400,
    height: 200,
  },
};

const ComplexExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive example combining multiple features: donut chart, custom colors, labels, and highlighting.',
      },
    },
  },
  args: {
    series: [
      {
        data: [
          { id: 0, value: 35, label: 'Frontend', color: '#3B82F6' },
          { id: 1, value: 25, label: 'Backend', color: '#10B981' },
          { id: 2, value: 20, label: 'Database', color: '#F59E0B' },
          { id: 3, value: 15, label: 'DevOps', color: '#EF4444' },
          { id: 4, value: 5, label: 'Other', color: '#8B5CF6' },
        ],
        innerRadius: 10,
        outerRadius: 90,
        paddingAngle: 2,
        cornerRadius: 3,
        arcLabel: (item) => `${item.value}%`,
        arcLabelMinAngle: 10,
        highlightScope: { fade: 'global', highlight: 'item' },
        highlighted: { additionalRadius: 8 },
        faded: { additionalRadius: -8, color: '#D1D5DB' },
      },
    ],
    width: 400,
    height: 200,
  },
};

export default meta;
export {
  AdvancedHighlight,
  ComplexExample,
  CustomSizing,
  Default,
  DonutChart,
  FormattedValueLabels,
  WithColors,
  WithColorPalette,
  WithHighlight,
  WithLabels,
};
