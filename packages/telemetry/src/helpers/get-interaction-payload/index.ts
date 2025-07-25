import type { DomEventData } from '../../types/dom-event-data';
import type { InteractionSchema } from '@varsitytutors/event-tracker';
import type { LDEvaluationDetail } from '@blueshift-ui/core/dist/types/launchdarkly';
import type { Test } from '../../types/track-params';
import type { TrackEntity } from '../../types/track-entity';

import formatAnalyticsValue from '../format-analytics-value';

interface GetInteractionPayloadParams {
  [key: string]: any;
  action: string;
  category: string;
  clientUuid?: string;
  divisionId?: string;
  domEventData: DomEventData;
  entity?: TrackEntity;
  flagEvaluationDetail?: LDEvaluationDetail;
  label?: string;
  pageRequestId: string;
  sessionId: string;
  tests?: Test[];
  visitorId: string;
}

interface GetInteractionPayloadOptions {
  useFormatData: boolean;
}

function getInteractionPayload(
  params: GetInteractionPayloadParams,
  options: GetInteractionPayloadOptions
): InteractionSchema {
  const {
    action,
    category,
    divisionId = 'VT::VT',
    clientUuid,
    entity,
    flagEvaluationDetail,
    label,
    visitorId,
    sessionId,
    pageRequestId,
    userId,
    tests,
    domEventData,
  } = params;
  return {
    customEventData: {
      action: options.useFormatData ? formatAnalyticsValue(`${action}`, 'action') : action,
      category: options.useFormatData ? formatAnalyticsValue(`${category}`, 'category') : category,
      flagEvaluationDetail,
      label: label
        ? options.useFormatData
          ? formatAnalyticsValue(`${label}`, 'label')
          : label
        : undefined,
      value: params.value,
    },
    domEventData,
    page: {
      clientUuid,
      divisionId,
      entity,
      sessionId,
      url: window.location.href.slice(0, 799),
      userAgent: navigator.userAgent,
      visitorId,
      tests,
      userId,
    },
    pageRequestId: pageRequestId,
  };
}

export default getInteractionPayload;
