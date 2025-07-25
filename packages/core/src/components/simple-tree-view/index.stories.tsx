import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import type { SimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';

import React from 'react';
import SimpleTreeView from '.';
import TreeItem from '../tree-item';

interface SimpleTreeViewStoryProps extends SimpleTreeViewProps<boolean | undefined> {
  defaultCollapseIcon?: ReactNode;
  defaultExpandIcon?: ReactNode;
}

const meta: Meta<SimpleTreeViewStoryProps> = {
  title: 'Navigation/SimpleTreeView',
  component: SimpleTreeView,
  argTypes: {
    defaultCollapseIcon: {
      control: 'element',
      description: 'The icon used to collapse the node.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    defaultExpandIcon: {
      control: 'element',
      description: 'The icon used to expand the node.',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    multiSelect: {
      control: 'boolean',
      description: 'Allows selecting multiple items.',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
};

type Story = StoryObj<SimpleTreeViewStoryProps>;

const SimpleTreeViewWrapper = (args: SimpleTreeViewStoryProps) => (
  <SimpleTreeView {...args}>
    <TreeItem itemId="1" label="Parent 1">
      <TreeItem itemId="2" label="Child 1-1" />
      <TreeItem itemId="3" label="Child 1-2">
        <TreeItem itemId="4" label="Child 1-2-1" />
      </TreeItem>
    </TreeItem>
    <TreeItem itemId="5" label="Parent 2">
      <TreeItem itemId="6" label="Child 2-1" />
    </TreeItem>
  </SimpleTreeView>
);

const Default: Story = {
  render: (args) => <SimpleTreeViewWrapper {...args} />,
  args: {
    defaultExpandIcon: <span>+</span>,
    defaultCollapseIcon: <span>-</span>,
    multiSelect: false,
  },
};

const SimpleTreeViewMultiSelectCheckBoxes = (args: SimpleTreeViewStoryProps) => (
  <SimpleTreeView {...args} checkboxSelection multiSelect>
    <TreeItem itemId="1" label="Parent 1">
      <TreeItem itemId="2" label="Child 1-1" />

      <TreeItem itemId="3" label="Child 1-2">
        <TreeItem itemId="4" label="Child 1-2-1" />
      </TreeItem>
    </TreeItem>

    <TreeItem itemId="5" label="Parent 2">
      <TreeItem itemId="6" label="Child 2-1" />
    </TreeItem>
  </SimpleTreeView>
);

export { Default, SimpleTreeViewMultiSelectCheckBoxes };

export default meta;
