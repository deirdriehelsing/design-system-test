import { Command, Option } from 'commander';
import generateEventTypesAction from './action';
import path from 'path';

const generateEventTypes = new Command('generate-event-types');

generateEventTypes.addOption(
  new Option('-c, --config <config>', 'Types generation config file path')
    .default(
      path.join(process.cwd(), 'analytics.json'),
      'uses analytics.json in the current working directory'
    )
    .makeOptionMandatory(true)
);

generateEventTypes.addOption(
  new Option('-t, --token <token>', 'Segment API token with Tracking Plan Read permission')
    .default(
      process.env.VT_SEGMENT_API_TOKEN,
      'uses value from VT_SEGMENT_API_TOKEN environment variable'
    )
    .makeOptionMandatory(true)
);

generateEventTypes.action(generateEventTypesAction);

export default generateEventTypes;
