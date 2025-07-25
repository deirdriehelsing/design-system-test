import * as styles from './index.css';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';

interface StepperSummaryItemDescriptionProps {
  children: string;
  className?: string;
  labelledby?: string;
}

function StepperSummaryItemDescription({
  children,
  className,
  labelledby,
}: StepperSummaryItemDescriptionProps) {
  return (
    <Typography
      aria-labelledby={labelledby}
      className={classNames(styles.description, className)}
      component="data"
      value={children}
      variant="labelSmall"
    >
      {children}
    </Typography>
  );
}

export default StepperSummaryItemDescription;
