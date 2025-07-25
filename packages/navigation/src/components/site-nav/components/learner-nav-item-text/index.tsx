import type { ActiveLearner, AuthenticatedUser } from '@blueshift-ui/auth';

import * as styles from './index.css';
import Avatar from '@blueshift-ui/data-display/dist/components/avatar';

interface LearnerNavItemTextProps {
  activeLearner: ActiveLearner;
  user?: AuthenticatedUser;
}

function LearnerNavItemText({ activeLearner, user }: LearnerNavItemTextProps) {
  return (
    <div className={styles.text}>
      <Avatar
        backgroundVariant="outlined"
        index={user?.students?.indexOf(activeLearner) ?? 0}
        userName={[activeLearner.first_name, activeLearner.last_name]}
      />
      <span>{`${activeLearner.first_name} ${activeLearner.last_name[0] ?? ''}`.trim()}</span>
    </div>
  );
}

export default LearnerNavItemText;
