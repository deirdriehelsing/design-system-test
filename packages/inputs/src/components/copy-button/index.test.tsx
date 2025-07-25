import { render, screen } from '@testing-library/react';
import CopyButton from '.';
import React from 'react';
import logHandledError from '@blueshift-ui/telemetry/dist/helpers/log-handled-error';
import userEvent from '@testing-library/user-event';

const mockTrackEvent = jest.fn();
const mockLogHandledError = logHandledError as jest.MockedFunction<typeof logHandledError>;
const mockOnCopy = jest.fn();
const mockOnError = jest.fn();
const mockWindowCopy = jest.fn();

const valueToCopy = 'Test Value';

jest.mock('@blueshift-ui/telemetry/dist/helpers/log-handled-error');
jest.mock('@blueshift-ui/telemetry/dist/hooks/use-interaction-tracker', () =>
  jest.fn(() => ({
    trackEvent: mockTrackEvent,
  }))
);

describe('CopyButton', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: {
        clipboard: {
          writeText: mockWindowCopy,
        },
        writable: true,
      },
    });
  });

  describe('rendering', () => {
    it('renders the button with children', () => {
      render(
        <CopyButton onCopy={mockOnCopy} onError={mockOnError} value={valueToCopy}>
          Copy
        </CopyButton>
      );

      expect(screen.getByText('Copy')).toBeInTheDocument();
    });
  });

  describe('analytics', () => {
    it('copies text and tracks event on click', async () => {
      mockWindowCopy.mockImplementation((value) => Promise.resolve(value));

      render(
        <CopyButton onCopy={mockOnCopy} onError={mockOnError} value={valueToCopy}>
          Copy
        </CopyButton>
      );

      await userEvent.click(screen.getByText('Copy'));

      expect(mockWindowCopy).toHaveBeenCalledWith(valueToCopy);
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: 'copy-to-clipboard',
        category: 'copy-button',
        label: valueToCopy,
      });
      expect(mockOnCopy).toHaveBeenCalledWith(valueToCopy);
    });

    it('handles copy error', async () => {
      const errorMessage = 'Failed to copy';
      mockWindowCopy.mockImplementation(() => Promise.reject(errorMessage));

      render(
        <CopyButton onCopy={mockOnCopy} onError={mockOnError} value={valueToCopy}>
          Copy
        </CopyButton>
      );

      await userEvent.click(screen.getByText('Copy'));

      expect(mockOnCopy).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledWith(errorMessage);
      expect(mockLogHandledError).toHaveBeenCalledWith('Failed to copy to clipboard', {
        error: 'Failed to copy',
      });
    });
  });
});
