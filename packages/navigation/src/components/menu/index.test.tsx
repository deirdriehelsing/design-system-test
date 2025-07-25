import { render, screen, waitFor } from '@testing-library/react';
import Button from '@blueshift-ui/core/dist/components/button';
import Menu from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('@phosphor-icons/react', () => ({
  CaretDown: () => <div>CaretDown</div>,
  CaretRight: () => <div>CaretRight</div>,
}));

jest.mock('@mui/material/Divider', () => {
  return ({ className, classes, ...props }) => (
    <div
      className={className || (classes?.root ?? 'mock-divider')}
      {...props}
      data-testid="divider"
    />
  );
});

jest.mock('@mui/material/MenuItem', () => {
  return ({ className, classes, ...props }) => (
    <div
      className={className || (classes?.root ?? 'mock-menu-item')}
      {...props}
      data-testid="menu-item"
    />
  );
});

describe('<Menu />', () => {
  it('renders a trigger CTA', () => {
    render(
      <Menu
        items={[
          { componentProps: { href: '#' }, role: 'action', text: 'Item 1' },
          { componentProps: { href: '#' }, role: 'action', text: 'Item 2' },
        ]}
        trigger={Button}
        triggerProps={{ children: 'Open menu' }}
      />
    );
    const triggerCta = screen.getByText('Open menu');

    expect(triggerCta).toBeVisible();
  });

  it('renders a trigger CTA with trigger props', () => {
    render(
      <Menu
        items={[
          { componentProps: { href: '#' }, role: 'action', text: 'Item 1' },
          { componentProps: { href: '#' }, role: 'action', text: 'Item 2' },
        ]}
        trigger={Button}
        triggerProps={{ children: 'Open menu', startIcon: <div>icon</div> }}
      />
    );
    const triggerCta = screen.getByText('Open menu');

    expect(triggerCta).toBeVisible();
    expect(screen.getByText('icon')).toBeVisible();
  });

  it('renders menu item types', async () => {
    const user = userEvent.setup();

    render(
      <Menu
        items={[
          { componentProps: { href: '#' }, role: 'action', text: 'Item 1' },
          { componentProps: { href: '#' }, role: 'action', text: 'Item 2' },
          { role: 'divider' },
          { role: 'subheader', text: 'Item 3' },
        ]}
        trigger={Button}
        triggerProps={{ children: 'Open menu' }}
      />
    );
    const triggerCta = screen.getByText('Open menu');

    await user.click(triggerCta);

    expect(await screen.findByText('Item 2')).toBeVisible();
    expect(screen.getByTestId('divider')).toBeVisible();
    expect(screen.getByText('Item 3')).toBeVisible();
  });

  it('calls the onClick function passed into the trigger props when the trigger is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(
      <Menu
        items={[{ componentProps: { href: '#' }, role: 'action', text: 'Item 1' }]}
        trigger={Button}
        triggerProps={{ children: 'Open menu', onClick: mockOnClick }}
      />
    );
    const triggerCta = screen.getByText('Open menu');

    await user.click(triggerCta);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  it('opens nested menu items when clicked', async () => {
    const user = userEvent.setup();

    render(
      <Menu
        items={[
          { componentProps: { href: '#' }, role: 'action', text: 'Item 1' },
          { componentProps: { href: '#' }, role: 'action', text: 'Item 2' },
          {
            items: [
              { componentProps: { href: '#' }, role: 'action', text: 'Item 3-1' },
              { componentProps: { href: '#' }, role: 'action', text: 'Item 3-2' },
            ],
            role: 'nested',
            text: 'Item 3',
          },
        ]}
        trigger={Button}
        triggerProps={{ children: 'Open menu' }}
      />
    );

    const triggerCta = screen.getByText('Open menu');

    await user.click(triggerCta);

    expect(await screen.findByText('Item 3')).toBeVisible();

    await user.click(screen.getByText('Item 3'));

    expect(await screen.findByText('Item 3-1')).toBeVisible();
    expect(screen.getByText('Item 3-2')).toBeVisible();
  });

  it('closes nested menu items when trigger is clicked', async () => {
    const stopPropagationSpy = jest.spyOn(Event.prototype, 'stopPropagation');
    const preventDefaultSpy = jest.spyOn(Event.prototype, 'preventDefault');
    const user = userEvent.setup();

    render(
      <Menu
        items={[
          { componentProps: { href: '#' }, role: 'action', text: 'Item 1' },
          { componentProps: { href: '#' }, role: 'action', text: 'Item 2' },
        ]}
        trigger={Button}
        triggerProps={{ children: 'Open menu' }}
      />
    );
    const triggerCta = screen.getByText('Open menu');

    await user.click(triggerCta);

    // Menu is open
    expect(await screen.findByText('Item 1')).toBeVisible();
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    expect(stopPropagationSpy).toHaveBeenCalledTimes(1);

    await user.click(triggerCta);

    // Menu is closed
    await waitFor(() => {
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    expect(preventDefaultSpy).toHaveBeenCalledTimes(2);
    expect(stopPropagationSpy).toHaveBeenCalledTimes(2);

    stopPropagationSpy.mockRestore();
    preventDefaultSpy.mockRestore();
  });

  it('ensures only one menu can be open at a time', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Menu
          items={[
            { componentProps: { href: '#' }, role: 'action', text: 'First Menu Item 1' },
            { componentProps: { href: '#' }, role: 'action', text: 'First Menu Item 2' },
          ]}
          trigger={Button}
          triggerProps={{ children: 'First Menu' }}
        />
        <Menu
          items={[
            { componentProps: { href: '#' }, role: 'action', text: 'Second Menu Item 1' },
            { componentProps: { href: '#' }, role: 'action', text: 'Second Menu Item 2' },
          ]}
          trigger={Button}
          triggerProps={{ children: 'Second Menu' }}
        />
      </div>
    );

    // Open first menu
    const firstMenuTrigger = screen.getByText('First Menu');
    await user.click(firstMenuTrigger);

    // Verify first menu is open
    expect(await screen.findByText('First Menu Item 1')).toBeVisible();
    expect(screen.getByText('First Menu Item 2')).toBeVisible();

    // Open second menu
    const secondMenuTrigger = screen.getByText('Second Menu');
    await user.click(secondMenuTrigger);

    // Verify second menu is open
    expect(await screen.findByText('Second Menu Item 1')).toBeVisible();
    expect(screen.getByText('Second Menu Item 2')).toBeVisible();

    // Verify first menu is closed
    await waitFor(() => {
      expect(screen.queryByText('First Menu Item 1')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('First Menu Item 2')).not.toBeInTheDocument();
  });

  it('displays tooltip on hover', async () => {
    const user = userEvent.setup();

    render(
      <Menu
        items={[
          {
            componentProps: { href: '#' },
            role: 'action',
            text: 'Item 1',
            tooltip: 'Item 1 Tooltip',
          },
          {
            componentProps: { href: '#' },
            role: 'action',
            text: 'Item 2',
            tooltip: 'Item 2 Tooltip',
          },
        ]}
        trigger={Button}
        triggerProps={{ children: 'Open menu' }}
      />
    );

    const triggerCta = screen.getByText('Open menu');

    await user.click(triggerCta);

    expect(await screen.findByText('Item 1')).toBeVisible();

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

    expect(await screen.findByText('Item 2 Tooltip')).toBeVisible();
  });
});
