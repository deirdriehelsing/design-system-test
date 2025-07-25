import type { NestedNav } from '../../../../types';

import { render, screen, waitFor } from '@testing-library/react';
import NestedListItem from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

const nestedListItem = {
  role: 'nested',
  text: 'Nested List',
  items: [
    {
      role: 'action',
      text: 'Nested Action',
    },
  ],
} as NestedNav;

describe('<NestedListItem />', () => {
  it('renders', () => {
    render(<NestedListItem item={nestedListItem} />);

    expect(screen.getByText('Nested List')).toBeInTheDocument();
  });

  it('renders nested items', async () => {
    const user = userEvent.setup();

    render(<NestedListItem item={nestedListItem} />);

    await user.click(screen.getByText('Nested List'));

    await waitFor(() => {
      expect(screen.getByText('Nested Action')).toBeInTheDocument();
    });
  });
});
