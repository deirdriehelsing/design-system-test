import type { ViewTrackerParams } from '../../types/view-tracker-params';

import useViewTracking from '../../hooks/use-view-tracking';

function ViewTracker({ analytics, children }: ViewTrackerParams) {
  useViewTracking(analytics);
  return children;
}

export default ViewTracker;
