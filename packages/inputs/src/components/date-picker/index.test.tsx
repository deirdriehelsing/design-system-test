import { render, screen } from '@testing-library/react';
import DatePicker from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

const date = new Date('2024-10-01');
const day = date.getDate();

describe('<DatePicker />', () => {
  it('renders', () => {
    render(<DatePicker />);
  });

  it('renders when enabledDates are passed', async () => {
    const enabledDates = [date];
    const user = userEvent.setup();
    render(<DatePicker enabledDates={enabledDates} />);

    const button = screen.getByRole('button', { name: /choose date/i });

    await user.click(button);

    expect(screen.getByText(day)).toBeInTheDocument();
  });

  it('renders when enabledDates is empty', async () => {
    const enabledDates = [];
    const user = userEvent.setup();
    render(<DatePicker enabledDates={enabledDates} />);

    const button = screen.getByRole('button', { name: /choose date/i });

    await user.click(button);

    expect(screen.getByText(day)).toBeInTheDocument();
  });

  it('renders when shouldDisableDate is passed', async () => {
    const user = userEvent.setup();

    function shouldDisableDate(date: Date) {
      return date.getDate() === day + 1;
    }

    render(<DatePicker referenceDate={date} shouldDisableDate={shouldDisableDate} />);

    const button = screen.getByRole('button', { name: /choose date/i });

    await user.click(button);

    expect(screen.getByRole('gridcell', { name: `${day}` })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: `${day}` })).toBeEnabled();
    expect(screen.getByRole('gridcell', { name: `${day + 1}` })).not.toBeEnabled();
  });
});
