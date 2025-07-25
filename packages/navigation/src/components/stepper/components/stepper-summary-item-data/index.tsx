import * as styles from './index.css';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';

interface StepperSummaryItemDataProps {
  children: string;
  className?: string;
  labelledby?: string;
}

function StepperSummaryItemData({ children, className, labelledby }: StepperSummaryItemDataProps) {
  return (
    <Typography
      aria-labelledby={labelledby}
      className={classNames(styles.data, className)}
      component="data"
      value={children}
      variant="bodyMediumProminent"
    >
      {children}
    </Typography>
  );
}

export default StepperSummaryItemData;
