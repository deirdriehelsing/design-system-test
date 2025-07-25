import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import Button from '@blueshift-ui/core/dist/components/button';
import DateRangeFilterMenu from '.';

function DateRangeFilterMenuWrapper() {
  const endDate = new Date('2024-11-17T00:00:00.000Z');
  const startDate = new Date('2024-10-17T00:00:00.000Z');

  const [startDates, setStartDates] = useState<[Date | null, Date | null]>([startDate, endDate]);

  function handleClearFilter() {
    setStartDates([null, null]);
  }

  function handleResetFilter() {
    setStartDates([startDate, endDate]);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
      <DateRangeFilterMenu label="Dates" value={startDates} />
      <Button onClick={handleClearFilter} size="medium">
        Clear
      </Button>
      <Button color="secondary" onClick={handleResetFilter} size="medium">
        Reset to default
      </Button>
    </div>
  );
}

const meta: Meta<typeof DateRangeFilterMenu> = {
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the Chip',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  component: DateRangeFilterMenu,
  parameters: {
    docs: {
      description: {
        component:
          'The Date Range Filter Menu component lets users select a date range and is styled after our Filter Menu component. It is based on the [Material UI Date Range Picker](https://mui.com/x/react-date-pickers/date-range-picker/).',
      },
    },
  },
  title: 'Inputs/Date Range Filter Menu',
};

type Story = StoryObj<typeof DateRangeFilterMenu>;

const Default: Story = {
  args: {
    label: 'Dates',
    onAccept: (values) => console.log('onAccept. values = ', values),
    onClose: () => console.log('onClose'),
    onOpen: () => console.log('onOpen'),
    value: [null, null],
  },
};

const WithDefaultValues: Story = {
  render: () => <DateRangeFilterMenuWrapper />,
};

export { Default, WithDefaultValues };

export default meta;
