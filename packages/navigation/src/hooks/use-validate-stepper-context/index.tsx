import React from 'react';
import { StepperContext } from '../../context/stepper-context';

interface UseValidateStepperContextParams {
  componentName: string;
}

function useValidateStepperContext({ componentName }: UseValidateStepperContextParams) {
  const context = React.useContext(StepperContext);

  if (!context) {
    throw new Error(`${componentName} must be used within a Stepper component`);
  }
}

export default useValidateStepperContext;
