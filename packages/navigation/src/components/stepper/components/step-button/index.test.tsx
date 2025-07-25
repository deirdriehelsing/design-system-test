import { render, screen } from '@testing-library/react';
import React from 'react';
import StepButton from '.';
import Stepper from '../stepper';
import { activeStepAtom } from '../../../../state/stepper-atoms';
import { expectToThrow } from 'helpers/expect-to-throw';
import { useAtomValue } from 'jotai';
import userEvent from '@testing-library/user-event';

function StepButtonWrapper() {
  const activeStep = useAtomValue(activeStepAtom);

  return (
    <>
      <StepButton onClick={(setActiveStep) => setActiveStep((prev) => prev + 1)}>
        Click Me
      </StepButton>
      activeStep: {activeStep}
    </>
  );
}

describe('StepButton', () => {
  describe('rendering', () => {
    it('renders the button with children', () => {
      render(
        <Stepper>
          <StepButton onClick={() => true}>Click Me</StepButton>
        </Stepper>
      );

      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('throws an error if used outside a Stepper', () => {
      expectToThrow(() => {
        render(<StepButton onClick={() => true}>Click Me</StepButton>);
      });
    });
  });

  describe('interactions', () => {
    it('updates active step on click', async () => {
      const user = userEvent.setup();

      render(
        <Stepper>
          <StepButtonWrapper />
        </Stepper>
      );

      expect(screen.getByText(/activeStep: 0/)).toBeInTheDocument();

      await user.click(screen.getByText('Click Me'));

      expect(screen.getByText(/activeStep: 1/)).toBeInTheDocument();
    });
  });
});
