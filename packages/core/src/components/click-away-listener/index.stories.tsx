import type { Meta, StoryObj } from '@storybook/react';

import ClickAwayListener from '.';
import React from 'react';

(ClickAwayListener as React.FunctionComponent).displayName = 'ClickAwayListener';

const meta: Meta<typeof ClickAwayListener> = {
  title: 'Core/Click Away Listener',
  component: ClickAwayListener,
};

type Story = StoryObj<typeof ClickAwayListener>;

const Default: Story = {
  args: {
    children: <span>Content</span>,
    onClickAway: () => {
      window.alert('Click away behaviour');
    },
  },
};

export { Default };

export default meta;
