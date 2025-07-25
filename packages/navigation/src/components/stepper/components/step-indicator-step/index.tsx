import type { StepProps as MuiStepProps } from '@mui/material/Step';

import MuiStep from '@mui/material/Step';
import StepVariants from '../../../../constants/step-variants';

function StepIndicatorStep({ active, completed, ...muiStepProps }: MuiStepProps) {
  const variant = active
    ? StepVariants.ACTIVE
    : completed
      ? StepVariants.COMPLETED
      : StepVariants.PENDING;

  return (
    <MuiStep
      {...muiStepProps}
      active={active}
      className={`BlueshiftStep-${variant}`}
      completed={completed}
    />
  );
}

export default StepIndicatorStep;
