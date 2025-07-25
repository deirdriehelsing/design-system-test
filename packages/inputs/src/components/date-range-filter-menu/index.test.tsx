import { render, screen, waitFor } from '@testing-library/react';
import DateRangeFilterMenu from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

const startDate = new Date('2024-09-01T00:00:00.000Z');
const endDate = new Date('2024-10-31T00:00:00.000Z');

const defaultProps = {
  label: 'Date Range',
  onAccept: jest.fn(),
  onClose: jest.fn(),
  onOpen: jest.fn(),
  value: [startDate, endDate] as [Date | null, Date | null],
};

describe('<DateRangeFilterMenu />', () => {
  it('renders', () => {
    render(<DateRangeFilterMenu {...defaultProps} />);
    expect(screen.getByText('Date Range')).toBeInTheDocument();
  });

  it('renders when no props are passed', () => {
    render(<DateRangeFilterMenu />);
    expect(screen.getByText('CaretDown Icon')).toBeInTheDocument();
  });

  it('calls onOpen when the menu is opened', async () => {
    const user = userEvent.setup();
    render(<DateRangeFilterMenu {...defaultProps} />);

    user.click(screen.getByText('Date Range'));

    await waitFor(() => {
      expect(defaultProps.onOpen).toHaveBeenCalled();
    });
  });

  it('calls onClose when the menu is closed', async () => {
    const user = userEvent.setup();
    render(<DateRangeFilterMenu {...defaultProps} />);
    user.click(screen.getByText('Date Range'));
    user.click(document.body);

    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('calls onAccept with the correct values when a date range is selected', async () => {
    const user = userEvent.setup();
    render(<DateRangeFilterMenu {...defaultProps} />);
    await user.click(screen.getByText('Date Range'));
    await user.click((await screen.findAllByText('1'))[0]);
    await user.click((await screen.findAllByText('28'))[0]);

    await waitFor(() => {
      expect(defaultProps.onAccept).toHaveBeenCalledWith(
        [new Date('2024-09-01T00:00:00.000Z'), new Date('2024-09-28T00:00:00.000Z')],
        { validationError: [null, null] }
      );
    });
  });
});
