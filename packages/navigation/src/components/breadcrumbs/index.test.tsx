import { render, screen, waitFor } from '@testing-library/react';
import Breadcrumbs from '.';
import Link from '@blueshift-ui/core/dist/components/link';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('<Breadcrumbs />', () => {
  it('renders', () => {
    render(<Breadcrumbs items={[{ text: 'Item 1' }, { text: 'Item 2' }]} />);

    expect(screen.getByText('Item 1')).toBeVisible();
    expect(screen.getByText('Item 2')).toBeVisible();

    expect(screen.getByText('CaretRight Icon')).toBeVisible();
  });

  it('renders proper Links', () => {
    render(
      <Breadcrumbs
        items={[
          { component: Link, componentProps: { href: '/item-1' }, text: 'Item 1' },
          { component: Link, componentProps: { href: '/item-2' }, text: 'Item 2' },
        ]}
      />
    );

    expect(screen.getByText('Item 1')).toHaveProperty('href', 'http://localhost/item-1');
    expect(screen.getByText('Item 2')).toHaveProperty('href', 'http://localhost/item-2');
  });

  it('renders a custom separator', () => {
    render(
      <Breadcrumbs
        items={[{ text: 'Item 1' }, { text: 'Item 2' }]}
        separator={<div>Custom Separator</div>}
      />
    );

    expect(screen.getByText('Item 1')).toBeVisible();
    expect(screen.getByText('Item 2')).toBeVisible();

    expect(screen.getByText('Custom Separator')).toBeVisible();

    expect(screen.queryByText('CaretRight Icon')).not.toBeInTheDocument();
  });

  it('displays tooltip on hover', async () => {
    const user = userEvent.setup();

    render(
      <Breadcrumbs
        items={[
          { text: 'Item 1', tooltip: 'Item 1 Tooltip' },
          { text: 'Item 2', tooltip: 'Item 2 Tooltip' },
        ]}
      />
    );

    expect(screen.getByText('Item 1')).toBeVisible();

    expect(screen.queryByText('Item 1 Tooltip')).not.toBeInTheDocument();

    await user.hover(screen.getByText('Item 1'));

    await waitFor(() => {
      expect(screen.getByText('Item 1 Tooltip')).toBeVisible();
    });

    await user.unhover(screen.getByText('Item 1'));

    await waitFor(() => {
      expect(screen.getByText('Item 1 Tooltip')).not.toBeVisible();
    });

    expect(screen.queryByText('Item 2 Tooltip')).not.toBeInTheDocument();

    await user.hover(screen.getByText('Item 2'));

    await waitFor(() => {
      expect(screen.getByText('Item 2 Tooltip')).toBeVisible();
    });
  });
});
