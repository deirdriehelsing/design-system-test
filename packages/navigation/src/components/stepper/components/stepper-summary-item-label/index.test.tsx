import { render, screen } from '@testing-library/react';
import React from 'react';
import StepperSummaryItemLabel from '.';

describe('<StepperSummaryItemLabel />', () => {
  it('renders', () => {
    render(<StepperSummaryItemLabel>mock-label</StepperSummaryItemLabel>);

    const label = screen.getByText('mock-label');

    expect(label).toBeVisible();
    expect(label).toHaveAttribute('aria-label', 'mock-label');
  });
});
