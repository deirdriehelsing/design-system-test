import { render, screen } from '@testing-library/react';
import React from 'react';
import SimpleTreeView from '.';
import TreeItem from '../tree-item';
import userEvent from '@testing-library/user-event';

describe('SimpleTreeView', () => {
  it('should render the label text correctly inside SimpleTreeView', () => {
    render(
      <SimpleTreeView>
        <TreeItem itemId="1" label="Parent Node" />
        <TreeItem itemId="2" label="Child Node" />
      </SimpleTreeView>
    );

    expect(screen.getByText('Parent Node')).toBeInTheDocument();
    expect(screen.getByText('Child Node')).toBeInTheDocument();
  });

  it('should handle additional props and interactions correctly', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();

    render(
      <SimpleTreeView onItemClick={handleSelect}>
        <TreeItem itemId="1" label="Clickable Node" />
      </SimpleTreeView>
    );

    await user.click(screen.getByText('Clickable Node'));

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
