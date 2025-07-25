import { render, screen } from '@testing-library/react';
import MultiInputTimeRangeField from '.';
import React from 'react';

describe('<MultiInputTimeRangeField />', () => {
  it('renders', () => {
    render(<MultiInputTimeRangeField />);
  });

  it('renders with custom labels', () => {
    render(<MultiInputTimeRangeField endTimeInputLabel="To" startTimeInputLabel="From" />);

    const startTimeInput = screen.getByLabelText('From');
    const endTimeInput = screen.getByLabelText('To');

    expect(startTimeInput).toBeInTheDocument();
    expect(endTimeInput).toBeInTheDocument();
  });
});
