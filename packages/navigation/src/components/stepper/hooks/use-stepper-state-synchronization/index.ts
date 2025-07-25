import type { PropsWithChildren, ReactNode } from 'react';

import { activeStepAtom, labelsAtom } from '../../../../state/stepper-atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { useEffect } from 'react';
import validateStepComponent from '../../helpers/validate-step-component';

interface UseStepperStateSynchronizationParams {
  children?: ReactNode;
  givenActiveStep?: number;
  onStepChange?: (step: number) => void;
}

function useStepperStateSynchronization({
  children,
  givenActiveStep,
  onStepChange,
}: UseStepperStateSynchronizationParams) {
  const activeStep = useAtomValue(activeStepAtom);
  const setActiveStep = useSetAtom(activeStepAtom);
  const setLabels = useSetAtom(labelsAtom);

  // Sync labels with atoms
  useEffect(() => {
    let atomStepIndex = -1;
    const labels: Record<number, string> = {};

    React.Children.forEach(children, (child) => {
      if (validateStepComponent(child)) {
        atomStepIndex++;

        const { label } = child.props as PropsWithChildren<{ label?: string }>;

        if (label) {
          labels[atomStepIndex] = label;
        }
      }
    });

    setLabels(labels);
  }, [children, setLabels]);

  // Allow controlled components by giving the `step` prop priority over atom
  useEffect(() => {
    if (givenActiveStep === undefined || givenActiveStep === activeStep) {
      return;
    }

    setActiveStep(givenActiveStep);
    onStepChange?.(givenActiveStep);
  }, [activeStep, givenActiveStep, onStepChange, setActiveStep]);
}

export default useStepperStateSynchronization;
