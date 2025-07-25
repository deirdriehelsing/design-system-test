import type { ActionTracker, InteractionSchema } from '@varsitytutors/event-tracker';

import logHandledError from '../../../../../../helpers/log-handled-error';

async function trackActionTracker(
  actionTracker: ActionTracker | null,
  interaction: InteractionSchema
) {
  const action = interaction?.customEventData?.action;
  if (!actionTracker) {
    console.info('TrackInteractionProvider: ActionTracker event tracking is disabled', {
      action,
      category: interaction?.customEventData?.category,
      label: interaction?.customEventData?.label,
    });

    return;
  }

  try {
    await actionTracker.track(interaction);
  } catch (error) {
    logHandledError('ActionTracker: Error tracking user interaction event', { error });
  }
}

export default trackActionTracker;
