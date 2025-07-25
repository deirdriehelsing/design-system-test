import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Tooltip from '.';
import userEvent from '@testing-library/user-event';

describe('<Tooltip />', () => {
  it('displays tooltip on hover', async () => {
    render(
      <Tooltip color="primary" title="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const content = screen.getByText(/Hover me/i);
    await waitFor(() => expect(screen.queryByText('This is a tooltip')).toBeNull());

    await userEvent.hover(content);
    expect(await screen.findByText('This is a tooltip')).toBeVisible();

    await userEvent.unhover(content);
    await waitFor(() => expect(screen.queryByText('This is a tooltip')).toBeNull());
  });
});
