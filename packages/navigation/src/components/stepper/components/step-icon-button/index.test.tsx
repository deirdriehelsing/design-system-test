import { render, screen } from '@testing-library/react';
import React from 'react';
import StepIconButton from '.';
import Stepper from '../stepper';
import { activeStepAtom } from '../../../../state/stepper-atoms';
import { expectToThrow } from 'helpers/expect-to-throw';
import { useAtomValue } from 'jotai';
import userEvent from '@testing-library/user-event';

function StepIconButtonWrapper() {
  const activeStep = useAtomValue(activeStepAtom);

  return (
    <>
      <StepIconButton onClick={(setActiveStep) => setActiveStep((prev) => prev + 1)}>
        <samp>icon</samp>
      </StepIconButton>
      activeStep: {activeStep}
    </>
  );
}

describe('<StepIconButton />', () => {
  describe('rendering', () => {
    it('renders the button with children', () => {
      render(
        <Stepper>
          <StepIconButton onClick={() => true}>
            <samp>icon</samp>
          </StepIconButton>
        </Stepper>
      );

      expect(screen.getByText('icon')).toBeInTheDocument();
    });

    it('throws an error if used outside a Stepper', () => {
      expectToThrow(() => {
        render(
          <StepIconButton onClick={() => true}>
            <samp>icon</samp>
          </StepIconButton>
        );
      });
    });

    it('renders an icon button', () => {
      render(
        <Stepper>
          <StepIconButton onClick={() => true}>
            <samp>Icon</samp>
          </StepIconButton>
        </Stepper>
      );

      expect(screen.getByRole('button')).toHaveClass('MuiIconButton-root');
    });
  });

  describe('interactions', () => {
    it('updates active step on click', async () => {
      const user = userEvent.setup();

      render(
        <Stepper>
          <StepIconButtonWrapper />
        </Stepper>
      );

      expect(screen.getByText(/activeStep: 0/)).toBeInTheDocument();

      await user.click(screen.getByText('icon'));

      expect(screen.getByText(/activeStep: 1/)).toBeInTheDocument();
    });
  });
});
