import type { WizardStepperStepProps } from '../../../../types/wizard-stepper';

import * as styles from './index.css';
import StepIcon from '../step-icon';
import StepProgress from '../step-progress';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import clsx from 'clsx';

function WizardStepperStep({
  currentStepIndex = 0,
  icon,
  index,
  isLastStep,
  mobileSimplified,
  stepperId,
  text,
}: WizardStepperStepProps) {
  const ariaCurrent = index === currentStepIndex ? 'step' : undefined;
  const stepIsCompleted = index < currentStepIndex;
  const progressValueNow = index < currentStepIndex ? 1 : 0;
  const stepTextId = `stepper-${stepperId}-step-${index}-text`;

  return (
    <li
      aria-current={ariaCurrent}
      className={clsx(styles.step, { [styles.stepMobile]: mobileSimplified })}
      key={index}
    >
      <div
        aria-hidden={true}
        className={clsx(styles.icon, {
          [styles.iconMobile]: mobileSimplified,
          [styles.iconCompleted]: mobileSimplified && stepIsCompleted,
        })}
      >
        <StepIcon
          iconComponent={icon}
          index={index}
          mobileSimplified={mobileSimplified}
          stepIsCompleted={stepIsCompleted}
        />
      </div>
      <div className={clsx(styles.progress, { [styles.progressMobile]: mobileSimplified })}>
        <Typography className={styles.text} id={stepTextId} variant="labelMedium">
          {text}
        </Typography>
        <StepProgress
          isLastStep={isLastStep}
          mobileSimplified={mobileSimplified}
          progressValueNow={progressValueNow}
          stepTextId={stepTextId}
        />
      </div>
    </li>
  );
}

export default WizardStepperStep;
