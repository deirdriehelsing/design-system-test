import { render, screen } from '@testing-library/react';
import DateRangeChipField from '.';
import React from 'react';

describe('<DateRangeChipField />', () => {
  it('renders', () => {
    render(<DateRangeChipField label="Date Range" />);
    expect(screen.getByText('Date Range')).toBeInTheDocument();
    expect(screen.queryByText('Check Icon')).not.toBeInTheDocument();
    expect(screen.getByText('CaretDown Icon')).toBeInTheDocument();
  });

  it('renders when default values are present', () => {
    render(<DateRangeChipField hasValue={true} label="Date Range" />);
    expect(screen.getByText('Date Range')).toBeInTheDocument();
    expect(screen.getByText('Check Icon')).toBeInTheDocument();
  });

  it('renders when the menu is open', () => {
    render(<DateRangeChipField isOpen={true} label="Date Range" />);
    expect(screen.getByText('Date Range')).toBeInTheDocument();
    expect(screen.getByText('CaretUp Icon')).toBeInTheDocument();
  });
});
