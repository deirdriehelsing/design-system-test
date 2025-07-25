import type { WizardStepperStepProps } from '../../../../types/wizard-stepper';

import * as styles from './index.css';
import { Check, CheckCircle } from '@phosphor-icons/react';
import clsx from 'clsx';

interface StepIconProps {
  iconComponent: WizardStepperStepProps['icon'];
  index: number;
  mobileSimplified?: boolean;
  stepIsCompleted: boolean;
}

function StepIcon({
  stepIsCompleted,
  mobileSimplified,
  index,
  iconComponent: IconComponent,
}: StepIconProps) {
  if (!stepIsCompleted) {
    return (
      <div className={styles.iconContainer}>
        {mobileSimplified && <span className={styles.showOnMobile}>{index + 1}</span>}

        <IconComponent
          className={clsx(styles.showOnDesktop, !mobileSimplified && styles.showOnMobile)}
          weight="duotone"
        />
      </div>
    );
  }

  return (
    <div className={styles.iconContainer}>
      {mobileSimplified && (
        <div className={clsx(styles.checkContainer, styles.showOnMobile)}>
          <Check className={styles.checkSvg} weight="bold" />
        </div>
      )}

      <CheckCircle
        className={clsx(styles.showOnDesktop, !mobileSimplified && styles.showOnMobile)}
        weight="fill"
      />
    </div>
  );
}

export default StepIcon;
