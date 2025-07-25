import type { Meta, StoryObj } from '@storybook/react';

import Box from '@blueshift-ui/core/dist/components/box';
import { GraduationCap as GraduationCapIcon } from '@phosphor-icons/react';
import Pitch from '.';
import React from 'react';

const meta: Meta<typeof Pitch> = {
  title: 'Data Display/Pitch',
  component: Pitch,
  decorators: [(Story) => <Box style={{ width: '360px' }}>{Story()}</Box>],
  argTypes: {
    color: {
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
  },
};

type Story = StoryObj<typeof Pitch>;

const Default: Story = {
  args: {
    icon: <GraduationCapIcon size={32} />,
    color: 'accent01',
    children:
      'FPO: Take advantage of our team of expert tutors, ready and eager to help you succeed!',
  },
};

export { Default };

export default meta;
