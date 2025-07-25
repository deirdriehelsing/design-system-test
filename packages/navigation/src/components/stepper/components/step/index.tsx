import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, Ref } from 'react';

import * as styles from './index.css';
import classNames from 'clsx';
import { forwardRef } from 'react';
import useValidateStepperContext from '../../../../hooks/use-validate-stepper-context';

interface StepProps
  extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  /**
   * The label of the step.
   * This has custom behaviour in the Stepper component to sync with the StepIndicator.
   */
  label?: string;
}

function Step(
  { children, className, label, ...divProps }: StepProps,
  stepRef: Ref<HTMLDivElement>
) {
  useValidateStepperContext({ componentName: 'Step' });

  return (
    <div
      {...divProps}
      aria-label={label}
      className={classNames(styles.step, className)}
      ref={stepRef}
    >
      {children}
    </div>
  );
}

export default forwardRef<HTMLDivElement, StepProps>(Step);
