import { render, screen } from '@testing-library/react';
import React from 'react';
import StepperSummaryItemDescription from '.';

describe('<StepperSummaryItemDescription />', () => {
  it('renders', () => {
    render(
      <StepperSummaryItemDescription labelledby="mock-label">
        mock-description
      </StepperSummaryItemDescription>
    );

    const description = screen.getByText('mock-description');

    expect(description).toBeVisible();
    expect(description).toHaveAttribute('aria-labelledby', 'mock-label');
  });
});
