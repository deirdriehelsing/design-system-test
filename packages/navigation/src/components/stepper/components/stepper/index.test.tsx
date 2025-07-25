import { render, screen } from '@testing-library/react';
import React from 'react';
import Step from '../step';
import Stepper from '.';

describe('<Stepper />', () => {
  it('renders', () => {
    render(<Stepper />);
  });

  it('forwards div props', () => {
    const { container } = render(
      <Stepper className="class-name-mock" data-testid="mock-test-id" />
    );

    expect(container.firstChild).toHaveClass('class-name-mock');
    expect(container.firstChild).toHaveAttribute('data-testid', 'mock-test-id');
  });

  it('renders invalid step components as children', () => {
    const { container } = render(
      <Stepper>
        <div>Invalid step</div>
      </Stepper>
    );

    expect(container.firstChild).toContainHTML('<div>Invalid step</div>');
  });

  it('renders active step', () => {
    render(
      <Stepper activeStep={1}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
      </Stepper>
    );

    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeVisible();
    expect(screen.queryByText('Step 3')).not.toBeInTheDocument();
  });
});
