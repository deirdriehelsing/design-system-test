import { render, screen } from '@testing-library/react';
import DateRangePicker from '.';
import React from 'react';

describe('<DateRangePicker />', () => {
  it('uses a multiple input by default', () => {
    render(<DateRangePicker />);

    const startInput = screen.getByLabelText('Start');
    const endInput = screen.getByLabelText('End');

    expect(startInput).toBeInTheDocument();
    expect(endInput).toBeInTheDocument();
  });

  it('uses a single input if the useSingleInput prop is passed', () => {
    render(<DateRangePicker label="Test" useSingleInput />);

    const singleInput = screen.getByLabelText('Test');

    expect(singleInput).toBeInTheDocument();
  });
});
