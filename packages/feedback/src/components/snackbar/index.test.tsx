import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Snackbar from '.';
import userEvent from '@testing-library/user-event';

describe('component index', () => {
  describe('<Snackbar />', () => {
    it('is defined', () => {
      expect(Snackbar).toBeDefined();
    });

    it('should display the given message', () => {
      render(<Snackbar message="mock-message" open />);

      const message = screen.getByText('mock-message');

      expect(message).toBeInTheDocument();
    });

    it('should give correct reason for closing when pressing the close button', async () => {
      const user = userEvent.setup();
      const onCloseMock = jest.fn();
      render(<Snackbar message="mock-message" onClose={onCloseMock} open />);

      const closeButton = screen.getByRole('button', { name: /close/i });

      user.click(closeButton);

      await waitFor(() => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
      });

      expect(onCloseMock.mock.calls[0][1]).toBe('closeButtonPressed');
    });
  });
});
