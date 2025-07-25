import type {
  Apis as SegmentAPI,
  RuleV1 as TrackingPlanRule,
} from '@segment/public-api-sdk-typescript';

import { unwrap } from '@segment/public-api-sdk-typescript';

/**
 * Get the rules from a tracking plan and extract the jsonSchema nested structure from the rule
 * @param segmentPublicAPI - The Segment Public API instance
 * @param trackingPlanId - The ID of the tracking plan
 * @returns The rules from the tracking plan
 */
async function getTrackingPlanRules(
  segmentPublicAPI: SegmentAPI,
  trackingPlanId: string
): Promise<TrackingPlanRule[]> {
  const trackingPlanRules = await unwrap(
    segmentPublicAPI.trackingPlans.listRulesFromTrackingPlan(trackingPlanId)
  );

  return trackingPlanRules.rules.map((rule) => ({
    ...rule,
    jsonSchema: {
      ...rule.jsonSchema,
      properties: rule.jsonSchema.properties.properties.properties,
      required: rule.jsonSchema.properties.properties.required,
      type: rule.jsonSchema.properties.properties.type,
    },
  }));
}

export default getTrackingPlanRules;
