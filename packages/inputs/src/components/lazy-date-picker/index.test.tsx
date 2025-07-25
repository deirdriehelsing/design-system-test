import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import LazyDatePicker from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

const testDate = new Date('2024-10-01');
const testDay = testDate.getDate();
const user = userEvent.setup();

describe('<LazyDatePicker />', () => {
  it('renders the fallback TextField initially', () => {
    render(<LazyDatePicker />);

    expect(screen.getByPlaceholderText('MM/DD/YYYY')).toBeInTheDocument();
  });

  it('loads the lazy DatePicker when enabledDates is empty', async () => {
    const enabledDates: Date[] = [];
    render(<LazyDatePicker enabledDates={enabledDates} />);

    const button = screen.getByRole('button', { name: /choose date/i });
    await user.click(button);

    await waitFor(() => {
      const gridcells = screen.getAllByRole('gridcell');
      expect(gridcells.length).toBeGreaterThan(0);
    });
  });

  it('renders correctly when shouldDisableDate is passed', async () => {
    function shouldDisableDate(date: Date) {
      return date.getDate() === testDay + 1;
    }
    render(<LazyDatePicker referenceDate={testDate} shouldDisableDate={shouldDisableDate} />);

    const button = screen.getByRole('button', { name: /choose date/i });
    await user.click(button);

    const dayCell = await screen.findByRole('gridcell', { name: testDay.toString() });
    expect(dayCell).toBeInTheDocument();
    expect(dayCell).toBeEnabled();
    const disabledCell = await screen.findByRole('gridcell', { name: (testDay + 1).toString() });
    expect(disabledCell).not.toBeEnabled();
  });
});
