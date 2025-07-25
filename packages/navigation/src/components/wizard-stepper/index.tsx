import type { WizardStepperProps, WizardStepperThemeProps } from '../../types/wizard-stepper';
import type { CSSProperties } from 'react';

import * as styles from './index.css';
import { useEffect, useId, useMemo, useState } from 'react';
import WizardStepperStep from './components/wizard-stepper-step';
import clsx from 'clsx';
import { useScrollDirection } from 'react-use-scroll-direction';

function buildCssVariables(theme?: WizardStepperThemeProps) {
  return {
    '--wizard-stepper-background':
      theme?.backgroundStop1 &&
      `linear-gradient(90deg, ${theme?.backgroundStop1} 0%, ${theme?.backgroundStop2} 100%)`,
    '--wizard-stepper-color': theme?.color,
    '--wizard-stepper-completed-bar-color': theme?.completedBarColor,
    '--wizard-stepper-current-icon-background1': theme?.currentIconBackground1,
    '--wizard-stepper-current-icon-background2': theme?.currentIconBackground2,
    '--wizard-stepper-current-icon-background3': theme?.currentIconBackground3,
    '--wizard-stepper-icon-color': theme?.iconColor,
    '--wizard-stepper-icon-background': theme?.iconBackground,
    '--wizard-stepper-bar-color': theme?.barColor,
  } as CSSProperties;
}

function WizardStepper({
  anchor,
  autoHide,
  currentStepIndex = 0,
  fixed,
  mobileSimplified,
  steps,
  theme,
}: WizardStepperProps) {
  const style = useMemo(() => buildCssVariables(theme), [theme]);
  const [isScrolling, setIsScrolling] = useState(false);
  const { isScrollingDown, isScrollingUp } = useScrollDirection();
  const stepperId = useId();

  useEffect(() => {
    if (isScrollingUp && isScrolling) {
      setIsScrolling(false);
    }
    if (isScrollingDown && !isScrolling) {
      setIsScrolling(true);
    }
  }, [isScrollingDown, isScrollingUp, isScrolling]);

  return (
    <ul
      className={clsx(
        styles.stepper,
        isScrolling && autoHide && styles.scrolling,
        fixed && styles.fixed,
        anchor === 'top' && styles.anchorTop,
        anchor === 'bottom' && styles.anchorBottom,
        mobileSimplified && styles.stepperMobile,
        mobileSimplified && anchor === 'bottom' && styles.bottomStepperMobile
      )}
      style={style}
    >
      {steps.map((step, index) => (
        <WizardStepperStep
          currentStepIndex={currentStepIndex}
          index={index}
          isLastStep={index === steps.length - 1}
          key={`${stepperId}-${index}`}
          mobileSimplified={mobileSimplified}
          stepperId={stepperId}
          {...step}
        />
      ))}
    </ul>
  );
}

export default WizardStepper;
