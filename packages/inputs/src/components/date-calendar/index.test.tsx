import { render, screen } from '@testing-library/react';
import DateCalendar from '.';
import React from 'react';

const date = new Date('2000-01-01');
const day = date.getDate();

describe('<DateCalendar />', () => {
  it('renders', () => {
    render(<DateCalendar />);
  });

  it('renders when enabledDates are passed', () => {
    const enabledDates = [date];

    render(<DateCalendar enabledDates={enabledDates} referenceDate={date} />);

    expect(screen.getByRole('gridcell', { name: `${day}` })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: `${day}` })).toBeEnabled();
    expect(screen.getByRole('gridcell', { name: `${day + 1}` })).not.toBeEnabled();
  });

  it('renders when enabledDates is empty', () => {
    const enabledDates = [];

    render(<DateCalendar enabledDates={enabledDates} referenceDate={date} />);

    expect(screen.getByRole('gridcell', { name: `${day}` })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: `${day}` })).toBeEnabled();
  });

  it('renders when shouldDisableDate is passed', () => {
    function shouldDisableDate(date: Date) {
      return date.getDate() === day + 1;
    }

    render(<DateCalendar referenceDate={date} shouldDisableDate={shouldDisableDate} />);

    expect(screen.getByRole('gridcell', { name: `${day}` })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: `${day}` })).toBeEnabled();
    expect(screen.getByRole('gridcell', { name: `${day + 1}` })).not.toBeEnabled();
  });
});
