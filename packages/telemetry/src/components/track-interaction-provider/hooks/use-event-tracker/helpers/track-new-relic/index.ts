import type { InteractionSchema } from '@varsitytutors/event-tracker';

const objectWithoutEmptyValues = (obj: Record<string, string | undefined | null>) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value)) as Record<string, string>;

function trackNewRelic(interaction: InteractionSchema) {
  const {
    customEventData: { action, category, flagEvaluationDetail, label, value } = {
      action: '',
      category: '',
    },
    page: { clientUuid, entity, sessionId, userId, visitorId },
  } = interaction;

  if (window?.newrelic && action) {
    window.newrelic.addPageAction(
      action,
      objectWithoutEmptyValues({
        label,
        category,
        client_uuid: clientUuid,
        entity: entity ? JSON.stringify(entity) : undefined,
        session_id: sessionId,
        userId,
        value,
        visitorId,
        flag_evaluation_detail: flagEvaluationDetail
          ? JSON.stringify(flagEvaluationDetail)
          : undefined,
      })
    );
  }
}

export default trackNewRelic;
