import { Step, StepButton, StepIndicator, Stepper } from '.';
import { act, render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { activeStepAtom } from '../../state/stepper-atoms';
import { expectToThrow } from 'helpers/expect-to-throw';
import { useSetAtom } from 'jotai';
import userEvent from '@testing-library/user-event';

jest.mock('./components/dotted-step-icon', () => jest.fn(() => <samp>Dotted Step Icon</samp>));
jest.mock('./components/dashed-step-icon', () => jest.fn(() => <samp>Dashed Step Icon</samp>));

const mockSteps = [<p key={1}>Step 1</p>, <p key={2}>Step 2</p>];

describe('Stepper', () => {
  const resetActiveStep = () => {
    const { result } = renderHook(() => useSetAtom(activeStepAtom));
    act(() => {
      result.current(0);
    });
  };

  describe('with step indicator', () => {
    it('renders one step at a time', () => {
      resetActiveStep();

      render(
        <Stepper>
          <StepIndicator />
          {mockSteps.map((step, index) => (
            <Step key={index}>{step}</Step>
          ))}
        </Stepper>
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
      expect(screen.queryAllByText('Dotted Step Icon')).toHaveLength(mockSteps.length);
    });

    it('changes step', async () => {
      const user = userEvent.setup();
      const mockOnStepChange = jest.fn();

      resetActiveStep();

      render(
        <Stepper onStepChange={mockOnStepChange}>
          <StepIndicator />
          {mockSteps.map((step, index) => (
            <Step key={index}>{step}</Step>
          ))}
          <StepButton onClick={(setActiveStep) => setActiveStep((prev) => prev + 1)}>
            Next
          </StepButton>
        </Stepper>
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.queryByText('Step 2')).not.toBeInTheDocument();

      await user.click(screen.getByText('Next'));

      expect(mockOnStepChange).toHaveBeenCalledWith(1);

      expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });
  });

  describe('without step indicator', () => {
    it('renders one step at a time', () => {
      resetActiveStep();

      render(
        <Stepper>
          {mockSteps.map((step, index) => (
            <Step key={index}>{step}</Step>
          ))}
        </Stepper>
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Dotted Step Icon')).not.toBeInTheDocument();
    });
  });

  it('renders a controlled stepper', () => {
    resetActiveStep();

    const { rerender } = render(
      <Stepper activeStep={0}>
        <StepIndicator />
        {mockSteps.map((step, index) => (
          <Step key={index}>{step}</Step>
        ))}
      </Stepper>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.queryByText('Step 2')).not.toBeInTheDocument();

    rerender(
      <Stepper activeStep={1}>
        <StepIndicator />
        {mockSteps.map((step, index) => (
          <Step key={index}>{step}</Step>
        ))}
      </Stepper>
    );

    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('should throw an error if <Step /> is not inside a <Stepper />', () => {
    expectToThrow(() => {
      render(<Step>Step</Step>);
    });
  });

  it('should throw an error if <StepIndicator /> is not inside a <Stepper />', () => {
    expectToThrow(() => {
      render(<StepIndicator />);
    });
  });
});
