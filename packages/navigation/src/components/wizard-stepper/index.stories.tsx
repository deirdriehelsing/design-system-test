import type { Meta, StoryObj } from '@storybook/react';
import type { FunctionComponent } from 'react';

import {
  ArrowsDownUp,
  FlyingSaucer,
  HandsClapping,
  NumberCircleFour,
  NumberCircleOne,
  NumberCircleThree,
  NumberCircleTwo,
  PersonArmsSpread,
} from '@phosphor-icons/react';
import React from 'react';
import WizardStepper from '.';

(WizardStepper as FunctionComponent).displayName = 'WizardStepper';

const meta: Meta<typeof WizardStepper> = {
  title: 'Navigation/WizardStepper',
  component: WizardStepper,
  args: {
    currentStepIndex: 1,
    fixed: false,
    steps: [
      {
        icon: FlyingSaucer,
        text: 'Step 1',
      },
      {
        icon: PersonArmsSpread,
        text: 'Step 2',
      },
      {
        icon: ArrowsDownUp,
        text: 'Step 3',
      },
      {
        icon: HandsClapping,
        text: 'Step 4',
      },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 'calc(100vw)' }}>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof WizardStepper>;

const Default: Story = {
  args: {},
};

const Themed: Story = {
  args: {
    theme: {
      backgroundStop1: '#4B47C5',
      backgroundStop2: '#560D8C',
      color: 'white',
      completedBarColor: '#17E2EA',
      currentIconBackground1: '#61B86E',
      currentIconBackground2: '#EF5A3C',
      currentIconBackground3: '#FFBF40',
    },
  },
};

const Themed2: Story = {
  args: {
    theme: {
      backgroundStop1: '#9BD8CD',
      backgroundStop2: '#7FAFA6',
      barColor: 'white',
      iconBackground: 'white',
      iconColor: 'currentColor',
    },
  },
};

const MobileNumbers: Story = {
  args: {
    steps: [
      {
        icon: NumberCircleOne,
        text: 'Step 1',
      },
      {
        icon: NumberCircleTwo,
        text: 'Step 2',
      },
      {
        icon: NumberCircleThree,
        text: 'Step 3',
      },
      {
        icon: NumberCircleFour,
        text: 'Step 4',
      },
    ],
  },
};

const MobileSimplified: Story = {
  args: {
    mobileSimplified: true,
  },
};

const MobileSimplifiedThemed: Story = {
  args: {
    mobileSimplified: true,
    theme: {
      backgroundStop1: '#4B47C5',
      backgroundStop2: '#560D8C',
      barColor: 'white',
      completedBarColor: '#17E2EA',
      color: 'white',
      currentIconBackground1: '#FFBF40',
      currentIconBackground2: '#FFBF40',
      currentIconBackground3: '#FFBF40',
    },
  },
};

export { Default, Themed, Themed2, MobileNumbers, MobileSimplified, MobileSimplifiedThemed };

export default meta;
