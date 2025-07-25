import { render, screen, waitFor } from '@testing-library/react';
import ClickAwayListener from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('<ClickAwayListener />', () => {
  it('should call onClickAway when clicking away from the target', async () => {
    const user = userEvent.setup();

    const handleClickAway = jest.fn();

    render(
      <>
        <div>Content</div>

        <ClickAwayListener onClickAway={handleClickAway}>
          <div>Target</div>
        </ClickAwayListener>
      </>
    );

    const target = screen.getByText('Target');

    await user.click(target);

    expect(handleClickAway).toHaveBeenCalledTimes(0);

    const content = await screen.findByText('Content');
    await user.click(content);

    await waitFor(() => {
      expect(handleClickAway).toHaveBeenCalledTimes(1);
    });
  });
});
