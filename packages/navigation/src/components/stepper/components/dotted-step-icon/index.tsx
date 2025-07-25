import * as styles from './index.css';

function DottedStepIcon() {
  return (
    <div className={styles.outerDot}>
      <span className={styles.innerDot} />
    </div>
  );
}

export default DottedStepIcon;
