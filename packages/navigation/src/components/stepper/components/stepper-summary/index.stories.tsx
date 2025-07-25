import type { Meta, StoryObj } from '@storybook/react';

import {
  BookBookmark as BookBookmarkIcon,
  CalendarCheck as CalendarCheckIcon,
  ClockClockwise as ClockClockwiseIcon,
  Sparkle as SparkleIcon,
  Target as TargetIcon,
} from '@phosphor-icons/react';
import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';
import Stepper from '../stepper';
import StepperSummary from '.';
import StepperSummaryItem from '../stepper-summary-item';
import StepperSummaryItemData from '../stepper-summary-item-data';
import StepperSummaryItemDescription from '../stepper-summary-item-description';
import StepperSummaryItemLabel from '../stepper-summary-item-label';

function Container(props) {
  return (
    <Stepper>
      <StepperSummary {...props} />
    </Stepper>
  );
}

const meta: Meta<typeof StepperSummary> = {
  component: Container,
  decorators: [(Story) => <Box style={{ width: '300px' }}>{Story()}</Box>],
  parameters: {
    docs: {
      description: {
        component:
          'Stepper summary component to display the summary of each `<Step />` component inside a `<Stepper />`.',
      },
    },
  },
  title: 'Navigation/Stepper/Stepper Summary',
};

type Story = StoryObj<typeof StepperSummary>;

const Default: Story = {
  args: {
    children: (
      <>
        <StepperSummaryItem
          icon={<BookBookmarkIcon size={32} weight="duotone" />}
          onEdit={() => window.alert('Edit subject')}
        >
          <StepperSummaryItemLabel>Subject</StepperSummaryItemLabel>
          <StepperSummaryItemData>Pre-Calculus</StepperSummaryItemData>
        </StepperSummaryItem>
        <StepperSummaryItem
          icon={<SparkleIcon size={32} weight="duotone" />}
          iconColor="accent03"
          onEdit={() => window.alert('Edit start date')}
        >
          <StepperSummaryItemLabel>Start Date</StepperSummaryItemLabel>
          <StepperSummaryItemData>Thu, April 11</StepperSummaryItemData>
        </StepperSummaryItem>
        <StepperSummaryItem
          icon={<ClockClockwiseIcon size={32} weight="duotone" />}
          iconColor="var(--ref-palette-accent04-shade50)"
          onEdit={() => window.alert('Edit frequency')}
        >
          <StepperSummaryItemLabel>Frequency</StepperSummaryItemLabel>
          <StepperSummaryItemData>1x per week</StepperSummaryItemData>
        </StepperSummaryItem>
        <StepperSummaryItem
          icon={<CalendarCheckIcon size={32} weight="duotone" />}
          iconColor="var(--ref-palette-tertiary-shade50)"
          onEdit={() => window.alert('Edit availability')}
        >
          <StepperSummaryItemLabel>Availability</StepperSummaryItemLabel>
          <StepperSummaryItemData>Tue, 9am - 12pm</StepperSummaryItemData>
          <StepperSummaryItemData>Thu, 9am - 12pm</StepperSummaryItemData>
        </StepperSummaryItem>
        <StepperSummaryItem
          icon={<TargetIcon size={32} weight="duotone" />}
          iconColor="success"
          onEdit={() => window.alert('Edit needs & goals')}
        >
          <StepperSummaryItemLabel>Needs & Goals</StepperSummaryItemLabel>
          <StepperSummaryItemData>Failing a class</StepperSummaryItemData>
          <StepperSummaryItemDescription>
            My son is finding this class really challenging, and I'm worried about him failing.
          </StepperSummaryItemDescription>
        </StepperSummaryItem>
      </>
    ),
  },
};

export { Default };

export default meta;
