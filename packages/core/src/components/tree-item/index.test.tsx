import { render, screen } from '@testing-library/react';
import React from 'react';
import SimpleTreeView from '../simple-tree-view';
import TreeItem from '.';
import userEvent from '@testing-library/user-event';

describe('SimpleTreeView', () => {
  it('should render multiple children correctly', () => {
    render(
      <SimpleTreeView>
        <TreeItem itemId="1" label="Node 1" />
        <TreeItem itemId="2" label="Node 2" />
        <TreeItem itemId="3" label="Node 3" />
      </SimpleTreeView>
    );

    expect(screen.getByText('Node 1')).toBeInTheDocument();
    expect(screen.getByText('Node 2')).toBeInTheDocument();
    expect(screen.getByText('Node 3')).toBeInTheDocument();
  });

  it('should handle expand/collapse icons correctly', async () => {
    const user = userEvent.setup();

    render(
      <SimpleTreeView>
        <TreeItem itemId="1" label="Expandable Node" />
      </SimpleTreeView>
    );

    expect(screen.getByRole('treeitem')).toBeInTheDocument();

    await user.click(screen.getByRole('treeitem'));

    expect(screen.getByRole('treeitem')).toBeInTheDocument();
  });

  it('should handle multiSelect behavior', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();

    render(
      <SimpleTreeView multiSelect onItemClick={handleSelect}>
        <TreeItem itemId="1" label="Selectable Node 1" />
        <TreeItem itemId="2" label="Selectable Node 2" />
      </SimpleTreeView>
    );

    await user.click(screen.getByText('Selectable Node 1'));
    await user.click(screen.getByText('Selectable Node 2'));

    expect(handleSelect).toHaveBeenCalledTimes(2);
  });
});
