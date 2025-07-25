import * as styles from './index.css';
import Typography from '@blueshift-ui/theme/dist/components/typography';

interface StepperSummaryItemLabelProps {
  children?: string;
}

function StepperSummaryItemLabel({ children }: StepperSummaryItemLabelProps) {
  return (
    <Typography aria-label={children} className={styles.label} component="span" variant="bodySmall">
      {children}
    </Typography>
  );
}

export default StepperSummaryItemLabel;
