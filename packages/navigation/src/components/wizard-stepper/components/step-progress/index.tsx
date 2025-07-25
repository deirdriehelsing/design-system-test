import * as styles from './index.css';
import LinearProgress from '@blueshift-ui/core/dist/components/linear-progress';
import clsx from 'clsx';

interface StepProgressProps {
  isLastStep: boolean;
  mobileSimplified?: boolean;
  progressValueNow: number;
  stepTextId: string;
}

function StepProgress({
  isLastStep,
  stepTextId,
  progressValueNow,
  mobileSimplified,
}: StepProgressProps) {
  const commonProps = {
    'aria-labelledby': stepTextId,
    'aria-valuemax': 1,
    'aria-valuemin': 0,
    'aria-valuenow': progressValueNow,
    role: 'progressbar' as const,
  };

  const percent = progressValueNow * 100;

  return (
    <>
      <div
        {...commonProps}
        className={clsx(styles.bar, styles.showOnDesktop, {
          [styles.showOnMobile]: !mobileSimplified,
        })}
      />

      {mobileSimplified && (
        <LinearProgress
          aria-labelledby={stepTextId}
          className={clsx(styles.showOnMobile, { [styles.hideLast]: isLastStep })}
          color="neutral"
          size="xsmall"
          value={percent}
          variant="determinate"
        />
      )}
    </>
  );
}

export default StepProgress;
