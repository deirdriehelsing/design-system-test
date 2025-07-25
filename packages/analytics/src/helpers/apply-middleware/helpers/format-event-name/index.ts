import toStartCase from 'lodash/startCase';

/**
 * Ensures event names are in Start Case.
 *
 * @param name - The event name to format.
 * @returns The formatted event name.
 * @see https://varsity.atlassian.net/wiki/spaces/ENG/pages/1234501678/Event+Standards
 */
function formatEventName(name?: string) {
  if (!name) {
    return '';
  }

  return toStartCase(name);
}

export default formatEventName;
