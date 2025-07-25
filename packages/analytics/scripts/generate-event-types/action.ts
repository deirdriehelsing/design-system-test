import { configureApis } from '@segment/public-api-sdk-typescript';
import fs from 'fs';
import getTrackingPlanRules from './helpers/get-tracking-plan-rules';
import path from 'path';
import trackingPlanRulesToEventNames from './helpers/tracking-plan-rules-to-event-names';
import trackingPlanRulesToTypes from './helpers/tracking-plan-rules-to-types';

function writeFileSyncRecursive(filePath: string, contents: string) {
  const directory = path.dirname(filePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(filePath, contents);
}

interface GenerateEventTypesOptions {
  /**
   * The path to the config file
   */
  config: string;
  /**
   * The Segment public API token
   */
  token: string;
}

/**
 * CLI command to generate event types from tracking plan rules
 * @param options - The options for the generate event types action
 */
async function generateEventTypesAction({ config, token }: GenerateEventTypesOptions) {
  const segmentPublicAPI = configureApis(token);

  let generateTypesConfig;

  try {
    console.info(`Reading config file: ${config}`);
    generateTypesConfig = JSON.parse(fs.readFileSync(config, 'utf8'));
  } catch (err) {
    throw new Error('Invalid config file', { cause: err });
  }

  if (!generateTypesConfig.eventNamesOutputPath) {
    throw new Error('Missing eventNamesOutputPath');
  }

  if (!generateTypesConfig.eventTypesOutputPath) {
    throw new Error('Missing eventTypesOutputPath');
  }

  if (!generateTypesConfig.trackingPlanId) {
    throw new Error('Missing trackingPlanId');
  }

  const { eventNamesOutputPath, eventTypesOutputPath, trackingPlanId } = generateTypesConfig;
  const trackingPlanIds = Array.isArray(trackingPlanId) ? trackingPlanId : [trackingPlanId];

  console.info(`Fetching tracking plan rules: ${trackingPlanIds.join(', ')}`);
  const trackingPlansRules = (
    await Promise.all(
      trackingPlanIds.map((trackingPlanId: string) =>
        getTrackingPlanRules(segmentPublicAPI, trackingPlanId)
      )
    )
  ).flat();

  console.info('Generating event names from tracking plan rules');
  const eventNames = await trackingPlanRulesToEventNames(trackingPlansRules);

  console.info(`Writing event names to output file: ${eventNamesOutputPath}`);
  writeFileSyncRecursive(path.join(process.cwd(), eventNamesOutputPath), eventNames);

  console.info('Generating types from tracking plan rules');
  const typesDefinitions = await trackingPlanRulesToTypes(trackingPlansRules);

  console.info(`Writing types to output file: ${eventTypesOutputPath}`);
  writeFileSyncRecursive(path.join(process.cwd(), eventTypesOutputPath), typesDefinitions);
}

export default generateEventTypesAction;
