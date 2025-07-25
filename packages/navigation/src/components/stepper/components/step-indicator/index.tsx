import * as styles from './index.css';
import { activeStepAtom, labelsAtom, stepsCountAtom } from '../../../../state/stepper-atoms';
import DashedStepIcon from '../dashed-step-icon';
import DottedStepIcon from '../dotted-step-icon';
import MuiStepLabel from '@mui/material/StepLabel';
import MuiStepper from '@mui/material/Stepper';
import StepIndicatorStep from '../step-indicator-step';
import classNames from 'clsx';
import { useAtomValue } from 'jotai';
import useValidateStepperContext from '../../../../hooks/use-validate-stepper-context';

interface StepIndicatorProps {
  className?: string;
  variant?: 'dashed' | 'dotted';
}

function StepIndicator({ className, variant = 'dotted' }: StepIndicatorProps) {
  const labels = useAtomValue(labelsAtom);
  useValidateStepperContext({ componentName: 'StepIndicator' });

  const activeStep = useAtomValue(activeStepAtom);
  const stepsCount = useAtomValue(stepsCountAtom);
  const StepIcon = variant === 'dashed' ? DashedStepIcon : DottedStepIcon;

  return (
    <MuiStepper
      activeStep={activeStep}
      alternativeLabel={variant === 'dashed'}
      className={classNames(styles.header, `BlueshiftStepIndicator-${variant}`, className)}
      connector={null}
    >
      {Array.from({ length: stepsCount }, (_, index) => (
        <StepIndicatorStep active={activeStep === index} completed={activeStep > index} key={index}>
          <MuiStepLabel StepIconComponent={StepIcon}>{labels[index]}</MuiStepLabel>
        </StepIndicatorStep>
      ))}
    </MuiStepper>
  );
}

export default StepIndicator;
