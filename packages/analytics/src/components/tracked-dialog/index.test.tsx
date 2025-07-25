import type { TrackedDialogProps } from '../../types';

import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import TrackedDialog from '.';
import userEvent from '@testing-library/user-event';

const mockTrack = jest.fn();

jest.mock('../../hooks/use-analytics', () => ({
  __esModule: true,
  default: () => ({ track: mockTrack }),
}));

jest.mock('../../hooks/use-event-scope', () => ({
  __esModule: true,
  default: () => ({ pageSection: 'Test' }),
}));

function WrappedTrackedDialog(props: TrackedDialogProps) {
  const [open, setOpen] = useState(props.open);

  return (
    <>
      <button data-testid="open-dialog-button" onClick={() => setOpen(true)}>
        Open
      </button>

      <TrackedDialog {...props} onClose={() => setOpen(false)} open={open} />
    </>
  );
}

describe('<TrackedDialog />', () => {
  const mockId = 'test-dialog';
  const mockText = 'Test Dialog';
  const mockTitle = 'Test Title';
  const mockHref = 'http://example.com/';

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/test-path',
        href: mockHref,
      },
      writable: true,
    });
  });

  it('renders a dialog component with the provided props and tracks open events', () => {
    render(
      <WrappedTrackedDialog data-testid="tracked-dialog" id={mockId} open={true} title={mockTitle}>
        {mockText}
      </WrappedTrackedDialog>
    );

    const dialog = screen.getByTestId('tracked-dialog');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(mockText);
    expect(dialog).toHaveAttribute('id', mockId);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.elementOpened,
      expect.objectContaining({
        element_id: mockId,
        element_type: 'dialog',
        page_path: '/test-path',
        page_section: 'Test',
      })
    );
  });

  it('tracks open events with the correct properties', async () => {
    const user = userEvent.setup();
    const mockOpenProps = { custom_property: 'open-value' };

    render(
      <WrappedTrackedDialog
        data-testid="tracked-dialog"
        id={mockId}
        open={false}
        title={mockTitle}
        trackedProperties={{
          open: mockOpenProps,
        }}
      >
        {mockText}
      </WrappedTrackedDialog>
    );

    const button = screen.getByTestId('open-dialog-button');
    await user.click(button);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.elementOpened,
      expect.objectContaining({
        element_id: mockId,
        element_type: 'dialog',
        page_path: '/test-path',
        page_section: 'Test',
        ...mockOpenProps,
      })
    );
  });

  it('calls the provided onClose handler when closed', async () => {
    const user = userEvent.setup();
    const mockOnClose = jest.fn();

    render(
      <TrackedDialog
        data-testid="tracked-dialog"
        id={mockId}
        onClose={mockOnClose}
        open={true}
        title={mockTitle}
        withCloseButton={true}
      >
        {mockText}
      </TrackedDialog>
    );

    const closeButton = screen.getByLabelText('close');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Ensure the handler is called after the analytics call
    expect(mockTrack.mock.invocationCallOrder[0]).toBeLessThan(
      mockOnClose.mock.invocationCallOrder[0]
    );
  });

  it('tracks close events when dialog is closed', async () => {
    const user = userEvent.setup();
    const mockCloseProps = { custom_property: 'close-value' };

    render(
      <WrappedTrackedDialog
        data-testid="tracked-dialog"
        id={mockId}
        open={true}
        title={mockTitle}
        trackedProperties={{
          close: mockCloseProps,
        }}
        withCloseButton={true}
      >
        {mockText}
      </WrappedTrackedDialog>
    );

    const closeButton = screen.getByLabelText('close');
    await user.click(closeButton);

    expect(mockTrack).toHaveBeenCalledTimes(2);
    expect(mockTrack).toHaveBeenNthCalledWith(
      2,
      ANALYTICS_EVENT_NAMES.elementClosed,
      expect.objectContaining({
        element_id: mockId,
        element_type: 'dialog',
        page_path: '/test-path',
        page_section: 'Test',
        ...mockCloseProps,
      })
    );
  });
});
