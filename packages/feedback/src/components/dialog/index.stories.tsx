import type { Meta, StoryObj } from '@storybook/react';

import Alert from '@blueshift-ui/feedback/dist/components/alert';
import Button from '@blueshift-ui/core/dist/components/button';
import Dialog from '.';
import React from 'react';
import { useArgs } from '@storybook/preview-api';

(Dialog as React.FunctionComponent).displayName = 'Dialog';

function DialogStory(args) {
  const [, setArgs] = useArgs();

  return (
    <>
      <Button onClick={() => setArgs({ open: true })} variant="outlined">
        Open dialog
      </Button>

      <Dialog {...args} onClose={() => setArgs({ open: false })} />
    </>
  );
}

const meta: Meta<typeof Dialog> = {
  title: 'Feedback/Dialog',
  component: Dialog,
  argTypes: {
    dialogActionsProps: {
      description: 'Props applied to the `DialogActions` component.',
      table: {
        type: { summary: 'object' },
      },
    },
    dialogContentProps: {
      description: 'Props applied to the `DialogContent` component.',
      table: {
        type: { summary: 'object' },
      },
    },
    dialogTitleProps: {
      description: 'Props applied to the `DialogTitle` component.',
      table: {
        type: { summary: 'object' },
      },
    },
    maxWidth: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    anchor: {
      control: 'select',
      options: [undefined, 'bottom'],
    },
    withCloseButton: {
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      withDividers: {
        control: 'boolean',
        defaultValue: false,
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
    },
  },
  render: DialogStory,
};

type Story = StoryObj<typeof Dialog>;

const Default: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    title: 'Primary Dialog',
  },
};

const MaxWidth: Story = {
  args: {
    actions: [
      <Button key="disagree" variant="outlined">
        Disagree
      </Button>,
      <Button key="agree">Agree</Button>,
    ],
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    fullWidth: true,
    maxWidth: 'lg',
    title: 'Max width dialog',
  },
};

const FullScreen: Story = {
  args: {
    actions: [
      <Button key="disagree" variant="outlined">
        Disagree
      </Button>,
      <Button key="agree">Agree</Button>,
    ],
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    fullScreen: true,
    title: 'Full screen dialog',
  },
};

const ActionsAndAlert: Story = {
  args: {
    actions: (
      <>
        <Button key="agree">Agree</Button>
        <Button key="disagree" variant="outlined">
          Disagree
        </Button>
      </>
    ),
    slots: {
      alert: () => (
        <Alert severity="success" variant="text">
          This is a success alert
        </Alert>
      ),
    },
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    title: 'Actions dialog',
  },
};

const AnchorBottom: Story = {
  args: {
    actions: [
      <Button key="agree">Agree</Button>,
      <Button key="disagree" variant="outlined">
        Disagree
      </Button>,
    ],
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    title: 'Anchor bottom dialog',
    anchor: 'bottom',
    withDividers: true,
  },
};

const TopContent: Story = {
  args: {
    topContent: (
      <img
        alt="Screenshot of varsity educational platform interface. The lower-left corner shows a smiling woman tutor with dark hair, wearing a light blue shirt, greeting and some confetti in the air"
        sizes="(max-width: 375px) 300px, (max-width: 390px) 262px, (max-width: 669px) 247px, 236px"
        src="https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=242&amp;lossless=1&amp;w=300"
        srcSet="https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=242&amp;lossless=1&amp;w=300 300w, https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=211&amp;lossless=1&amp;w=262 262w, https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=200&amp;lossless=1&amp;w=247 247w, https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=190&amp;lossless=1&amp;w=236 236w"
        style={{ maxWidth: '100%' }}
      />
    ),
    title: 'Top content dialog',
    actions: [
      <Button key="agree">Agree</Button>,
      <Button key="disagree" variant="outlined">
        Disagree
      </Button>,
    ],
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    withCloseButton: true,
  },
};

const RightContent: Story = {
  args: {
    rightContent: (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          alt="Screenshot of varsity educational platform interface. The lower-left corner shows a smiling woman tutor with dark hair, wearing a light blue shirt, greeting and some confetti in the air"
          sizes="(max-width: 375px) 300px, (max-width: 390px) 262px, (max-width: 669px) 247px, 236px"
          src="https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=242&amp;lossless=1&amp;w=300"
          srcSet="https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=242&amp;lossless=1&amp;w=300 300w, https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=211&amp;lossless=1&amp;w=262 262w, https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=200&amp;lossless=1&amp;w=247 247w, https://llt.imgix.net/v1/1737578316-woman-with-bookshelf-background-teaching.png?auto=format%2Ccompress&amp;cs=origin&amp;dpr=1&amp;h=190&amp;lossless=1&amp;w=236 236w"
          style={{ maxWidth: '100%' }}
        />
      </div>
    ),
    actions: [<Button key="agree">Find a tutor</Button>],
    children:
      "You've just added a new subject to your learning! The next step? Get matched with a tutor who specializes in A level Biology.",
    title: 'Get expert help for A level Biology!',
    withCloseButton: true,
  },
};

const NoHeading: Story = {
  args: {
    actions: [<Button key="agree">Find a tutor</Button>],
    children:
      "You've just added a new subject to your learning! The next step? Get matched with a tutor who specializes in A level Biology.",
    withCloseButton: true,
  },
};

export {
  Default,
  AnchorBottom,
  ActionsAndAlert,
  FullScreen,
  MaxWidth,
  NoHeading,
  TopContent,
  RightContent,
};

export default meta;
