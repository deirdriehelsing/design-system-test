import type { NavItem } from '../../types';

import { render, screen, waitFor } from '@testing-library/react';
import List from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

const items = [
  {
    role: 'action',
    text: 'Action 1',
  },
  {
    role: 'action',
    text: 'Action 2',
  },
] as NavItem[];

describe('<List />', () => {
  it('renders', () => {
    render(<List items={items} />);

    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });

  describe('when items is empty', () => {
    it('renders nothing', () => {
      const { container } = render(<List items={[]} />);

      expect(container).toBeEmptyDOMElement();
    });
  });

  it('displays tooltip on hover', async () => {
    const user = userEvent.setup();

    render(
      <List
        items={[
          {
            componentProps: { href: '#' },
            role: 'action',
            text: 'Item 1',
            tooltip: 'Item 1 Tooltip',
          },
          {
            componentProps: { disabled: true, href: '#' },
            role: 'action',
            text: 'Item 2',
            tooltip: 'Item 2 Tooltip',
          },
        ]}
      />
    );

    expect(screen.getByText('Item 1')).toBeVisible();
    expect(screen.getByText('Item 2')).toBeVisible();

    expect(screen.queryByText('Item 1 Tooltip')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2 Tooltip')).not.toBeInTheDocument();

    await user.hover(screen.getByText('Item 1'));

    await waitFor(() => {
      expect(screen.getByText('Item 1 Tooltip')).toBeVisible();
    });

    await user.unhover(screen.getByText('Item 1'));

    await waitFor(() => {
      expect(screen.getByText('Item 1 Tooltip')).not.toBeVisible();
    });
  });
});
