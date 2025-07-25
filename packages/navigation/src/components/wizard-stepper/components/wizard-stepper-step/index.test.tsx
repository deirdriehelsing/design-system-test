import type { ComponentType } from 'react';
import type { WizardStepperStepProps } from '../../../../types/wizard-stepper';

import { render, screen } from '@testing-library/react';
import { Circle } from '@phosphor-icons/react';
import React from 'react';
import WizardStepperStep from '.';

describe('<WizardStepperStep />', () => {
  const renderComponent = (props: Partial<WizardStepperStepProps> = {}) => {
    const defaultProps: WizardStepperStepProps = {
      currentStepIndex: 0,
      icon: Circle as ComponentType,
      index: 0,
      isLastStep: false,
      stepperId: '1',
      text: 'Step 1',
      ...props,
    };

    return render(<WizardStepperStep {...defaultProps} />);
  };

  it('renders correctly', () => {
    renderComponent();

    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('shows the correct icon based on step completion', () => {
    renderComponent({ currentStepIndex: 1, index: 0 });

    // Check that the CheckCircle icon is rendered when the step is completed
    expect(screen.getByText('CheckCircle Icon')).toBeInTheDocument();
  });

  it('shows the correct icon for the current step', () => {
    renderComponent({ currentStepIndex: 0, index: 0 });

    // Check that the passed icon is rendered when the step is not yet completed
    expect(screen.getByText('Circle Icon')).toBeInTheDocument();
  });

  it('sets aria-current for the current step', () => {
    renderComponent({ currentStepIndex: 1, index: 1 });

    expect(screen.getByRole('listitem')).toHaveAttribute('aria-current', 'step');
  });

  it('sets the progress bar value correctly', () => {
    renderComponent({ currentStepIndex: 1, index: 0 });

    const progressBar = screen.getByRole('progressbar', { hidden: true });

    expect(progressBar).toHaveAttribute('aria-valuenow', '1');
  });

  it('does not set aria-current for non-current steps', () => {
    renderComponent({ currentStepIndex: 2, index: 0 });

    expect(screen.getByRole('listitem')).not.toHaveAttribute('aria-current');
  });
});
