import type { Meta, StoryObj } from '@storybook/react';

import { BookBookmark as BookBookmarkIcon } from '@phosphor-icons/react';
import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';
import Stepper from '../stepper';
import StepperSummary from '../stepper-summary';
import StepperSummaryItem from '../stepper-summary-item';
import StepperSummaryItemData from '../stepper-summary-item-data';
import StepperSummaryItemDescription from '../stepper-summary-item-description';
import StepperSummaryItemLabel from '.';

function Container(props) {
  return (
    <Stepper>
      <StepperSummary>
        <StepperSummaryItem
          icon={<BookBookmarkIcon size={32} weight="duotone" />}
          onEdit={() => window.alert('Edit clicked')}
        >
          <StepperSummaryItemLabel {...props} />
          <StepperSummaryItemData>&lt;/StepperSummaryItemData&gt;</StepperSummaryItemData>
          <StepperSummaryItemDescription>
            &lt;/StepperSummaryItemDescription&gt;
          </StepperSummaryItemDescription>
        </StepperSummaryItem>
      </StepperSummary>
    </Stepper>
  );
}

const meta: Meta<typeof StepperSummaryItemLabel> = {
  argTypes: {
    children: {
      control: 'text',
      description: 'The label and content to display',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  component: Container,
  decorators: [(Story) => <Box style={{ width: '300px' }}>{Story()}</Box>],
  parameters: {
    docs: {
      description: {
        component:
          'A stepper summary item label component to be displayed as an item list inside a `<StepperSummaryItem />` component.',
      },
    },
  },
  title: 'Navigation/Stepper/Stepper Summary/Stepper Summary Item/Stepper Summary Item Label',
};

type Story = StoryObj<typeof StepperSummaryItemLabel>;

const Default: Story = {
  args: {
    children: 'Subject',
  },
};

export { Default };

export default meta;
