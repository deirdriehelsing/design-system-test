import type { HTMLAttributes, PropsWithChildren } from 'react';

import * as styles from './index.css';
import React, { Children, useEffect } from 'react';
import { activeStepAtom, stepsCountAtom } from '../../../../state/stepper-atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import classNames from 'clsx';
import useStepperStateSynchronization from '../../hooks/use-stepper-state-synchronization';
import validateStepComponent from '../../helpers/validate-step-component';
import { withStepperProvider } from '../../../../context/stepper-context';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  activeStep?: number;
  onStepChange?: (step: number) => void;
}

function Stepper({
  activeStep: givenActiveStep,
  children,
  onStepChange,
  ...divProps
}: PropsWithChildren<StepperProps>) {
  const activeStep = useAtomValue(activeStepAtom);
  const setStepsCount = useSetAtom(stepsCountAtom);

  let stepIndex = -1;

  const stepsCount = React.Children.toArray(children).filter(validateStepComponent).length;

  useStepperStateSynchronization({ children, givenActiveStep, onStepChange });

  useEffect(() => {
    onStepChange?.(activeStep);
  }, [activeStep, onStepChange]);

  useEffect(() => {
    setStepsCount(stepsCount);
  }, [stepsCount, setStepsCount]);

  return (
    <div {...divProps} className={classNames(styles.stepper, divProps.className)}>
      {Children.map(children, (child) => {
        if (!validateStepComponent(child)) {
          return child;
        }

        stepIndex++;

        if (stepIndex === (givenActiveStep ?? activeStep)) {
          return child;
        }

        return null;
      })}
    </div>
  );
}

const StepperWithProvider = withStepperProvider(Stepper); // for better type hints

export default StepperWithProvider;
