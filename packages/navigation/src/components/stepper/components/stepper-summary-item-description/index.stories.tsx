import type { Meta, StoryObj } from '@storybook/react';

import { BookBookmark as BookBookmarkIcon } from '@phosphor-icons/react';
import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';
import Stepper from '../stepper';
import StepperSummary from '../stepper-summary';
import StepperSummaryItem from '../stepper-summary-item';
import StepperSummaryItemData from '../stepper-summary-item-data';
import StepperSummaryItemDescription from '.';
import StepperSummaryItemLabel from '../stepper-summary-item-label';

function Container(props) {
  return (
    <Stepper>
      <StepperSummary>
        <StepperSummaryItem
          icon={<BookBookmarkIcon size={32} weight="duotone" />}
          onEdit={() => window.alert('Edit clicked')}
        >
          <StepperSummaryItemLabel>&lt;/StepperSummaryItemLabel&gt;</StepperSummaryItemLabel>
          <StepperSummaryItemData>&lt;/StepperSummaryItemData&gt;</StepperSummaryItemData>
          <StepperSummaryItemDescription {...props} />
        </StepperSummaryItem>
      </StepperSummary>
    </Stepper>
  );
}

const meta: Meta<typeof StepperSummaryItemDescription> = {
  argTypes: {
    children: {
      control: 'text',
      description: 'The data and content to display',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'The classname for styling',
      table: {
        type: { summary: 'string' },
      },
    },
    labelledby: {
      control: 'text',
      description: 'The `<StepperSummaryItemLabel>` label value that labels the description',
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
          'A stepper summary item description component to be displayed as an item list inside a `<StepperSummaryItem />` component.',
      },
    },
  },
  title: 'Navigation/Stepper/Stepper Summary/Stepper Summary Item/Stepper Summary Item Description',
};

type Story = StoryObj<typeof StepperSummaryItemDescription>;

const Default: Story = {
  args: {
    children: 'This is the subject description',
    labelledby: 'Subject',
  },
};

export { Default };

export default meta;
