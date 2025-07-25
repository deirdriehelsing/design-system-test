import { render, screen } from '@testing-library/react';
import React from 'react';
import StepperSummaryItemData from '.';

describe('<StepperSummaryItemData />', () => {
  it('renders', () => {
    render(<StepperSummaryItemData labelledby="mock-label">mock-data</StepperSummaryItemData>);

    const data = screen.getByText('mock-data');

    expect(data).toBeVisible();
    expect(data).toHaveAttribute('aria-labelledby', 'mock-label');
  });
});
