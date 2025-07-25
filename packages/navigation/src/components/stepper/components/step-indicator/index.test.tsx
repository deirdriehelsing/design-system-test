import { render, screen } from '@testing-library/react';
import React from 'react';
import Step from '../step';
import StepIndicator from '.';
import StepVariants from '../../../../constants/step-variants';
import Stepper from '../stepper';

describe('<StepIndicator />', () => {
  it('renders', () => {
    render(
      <Stepper>
        <StepIndicator />
        <Step label="mock-step-1" />
        <Step label="mock-step-2" />
        <Step label="mock-step-3" />
      </Stepper>
    );

    expect(screen.getByText('mock-step-1')).toBeInTheDocument();
    expect(screen.getByText('mock-step-2')).toBeInTheDocument();
    expect(screen.getByText('mock-step-3')).toBeInTheDocument();
  });

  it('applies step styles', () => {
    render(
      <Stepper activeStep={1}>
        <StepIndicator />
        <Step label="mock-step-1" />
        <Step label="mock-step-2" />
        <Step label="mock-step-3" />
      </Stepper>
    );

    // Find steps by their labels and check their parent elements for the correct classes
    const step1 = screen.getByText('mock-step-1');
    const step2 = screen.getByText('mock-step-2');
    const step3 = screen.getByText('mock-step-3');

    /* eslint-disable testing-library/no-node-access */
    expect(step1.closest('[class*="MuiStep-root"]')).toHaveClass(
      `BlueshiftStep-${StepVariants.COMPLETED}`
    );
    expect(step2.closest('[class*="MuiStep-root"]')).toHaveClass(
      `BlueshiftStep-${StepVariants.ACTIVE}`
    );
    expect(step3.closest('[class*="MuiStep-root"]')).toHaveClass(
      `BlueshiftStep-${StepVariants.PENDING}`
    );
    /* eslint-enable testing-library/no-node-access */
  });

  it.each(['dashed', 'dotted'] as const)('renders with variant %s', (variant) => {
    render(
      <Stepper>
        <StepIndicator variant={variant} />
        <Step label="mock-step-1" />
        <Step label="mock-step-2" />
        <Step label="mock-step-3" />
      </Stepper>
    );

    // Find the stepper container by looking for the first step label within it
    /* eslint-disable-next-line testing-library/no-node-access */
    const stepperContainer = screen.getByText('mock-step-1').closest('[class*="MuiStepper-root"]');
    expect(stepperContainer).toHaveClass(`BlueshiftStepIndicator-${variant}`);
  });
});
