import type { Meta, StoryObj } from '@storybook/react';

import { BookBookmark as BookBookmarkIcon } from '@phosphor-icons/react';
import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';
import Stepper from '../stepper';
import StepperSummary from '../stepper-summary';
import StepperSummaryItem from '.';
import StepperSummaryItemData from '../stepper-summary-item-data';
import StepperSummaryItemDescription from '../stepper-summary-item-description';
import StepperSummaryItemLabel from '../stepper-summary-item-label';

function Container(props) {
  return (
    <Stepper>
      <StepperSummary>
        <StepperSummaryItem {...props} />
      </StepperSummary>
    </Stepper>
  );
}

const meta: Meta<typeof StepperSummaryItem> = {
  argTypes: {
    icon: {
      control: false,
      description: 'The icon to display.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    iconColor: {
      control: 'select',
      options: [
        'accent01',
        'accent02',
        'accent03',
        'accent04',
        'error',
        'info',
        'inherit',
        'primary',
        'secondary',
        'success',
        'warning',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    onEdit: {
      control: false,
      description: 'Callback function called when edit icon is clicked.',
      table: {
        type: { summary: 'function' },
      },
    },
  },
  component: Container,
  decorators: [(Story) => <Box style={{ width: '300px' }}>{Story()}</Box>],
  parameters: {
    docs: {
      description: {
        component:
          'A stepper summary item component to be displayed as an item list inside a `<StepperSummary />` component. Use subcomponents such as `<StepperSummaryItemLabel />`, `<StepperSummaryItemData />`, and `<StepperSummaryItemDescription />` to customize the content of the summary item.',
      },
    },
  },
  title: 'Navigation/Stepper/Stepper Summary/Stepper Summary Item',
};

type Story = StoryObj<typeof StepperSummaryItem>;

const Default: Story = {
  args: {
    icon: <BookBookmarkIcon size={32} weight="duotone" />,
    children: (
      <>
        <StepperSummaryItemLabel>Subject</StepperSummaryItemLabel>
        <StepperSummaryItemData labelledby="Subject">Pre-Calculus</StepperSummaryItemData>
        <StepperSummaryItemDescription labelledby="Subject">
          This is the subject description
        </StepperSummaryItemDescription>
      </>
    ),
    onEdit: () => window.alert('Edit clicked'),
  },
};

export { Default };

export default meta;
