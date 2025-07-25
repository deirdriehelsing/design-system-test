import { render, screen, waitFor } from '@testing-library/react';
import Button from '../button';
import Drawer from '.';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemText from '@mui/material/ListItemText';
import React from 'react';
import userEvent from '@testing-library/user-event';

function SampleList() {
  return (
    <MuiList>
      {[
        'Switch or manage profiles',
        'Membership',
        'Activity',
        'Payment',
        'Account Settings',
        'Support & FAQ',
        'How your membership works',
      ].map((text) => (
        <MuiListItem disablePadding key={text}>
          <MuiListItemButton>
            <MuiListItemText primary={text} />
          </MuiListItemButton>
        </MuiListItem>
      ))}
    </MuiList>
  );
}

describe('<Drawer />', () => {
  it('renders a trigger component', () => {
    render(
      <Drawer ariaLabel="aria-label" trigger={Button} triggerProps={{ children: 'test' }}>
        <SampleList />
      </Drawer>
    );
    const triggerComponent = screen.getByText('test');

    expect(triggerComponent).toBeVisible();
    expect(triggerComponent).toHaveAttribute('aria-haspopup', 'true');
    expect(triggerComponent).toHaveAttribute('aria-label', 'aria-label');
    expect(triggerComponent).toHaveAttribute('aria-controls', 'navigation-drawer');
    expect(triggerComponent).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles the drawer on trigger component click', async function () {
    const user = userEvent.setup();

    render(
      <Drawer ariaLabel="aria-label" trigger={Button} triggerProps={{ children: 'test' }}>
        <SampleList />
      </Drawer>
    );
    const triggerComponent = screen.getByText('test');
    expect(triggerComponent).toHaveAttribute('aria-expanded', 'false');

    await user.click(triggerComponent);

    expect(screen.getByText('Switch or manage profiles')).toBeVisible();
    expect(triggerComponent).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the drawer on close button click', async function () {
    const user = userEvent.setup();

    render(
      <Drawer
        ariaLabel="aria-label"
        trigger={Button}
        triggerProps={{ children: 'close drawer by icon test' }}
        withCloseButton={true}
      >
        <SampleList />
      </Drawer>
    );

    const triggerComponent = screen.getByText('close drawer by icon test');

    await user.click(triggerComponent);

    expect(screen.getByText('Switch or manage profiles')).toBeVisible();
    expect(triggerComponent).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByText('X Icon'));

    await waitFor(() => {
      expect(screen.queryByText('Switch or manage profiles')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('X Icon')).not.toBeInTheDocument();
    expect(triggerComponent).toHaveAttribute('aria-expanded', 'false');
  });
});
