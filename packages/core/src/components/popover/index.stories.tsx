import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import Popover from '.';

(Popover as React.FunctionComponent).displayName = 'Popover';

const meta: Meta<typeof Popover> = {
  title: 'Core/Popover',
  component: Popover,
};

type Story = StoryObj<typeof Popover>;

function PopoverStory() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <button onClick={handleClick}>Open Popover</button>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
        open={open}
      >
        Content
      </Popover>
    </>
  );
}

const Default: Story = {
  render: () => <PopoverStory />,
};

export { Default };

export default meta;
