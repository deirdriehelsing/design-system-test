import toSnakeCase from 'lodash/snakeCase';

type EventProperties = Record<string, unknown>;

/**
 * Ensures property names are snake_case.
 *
 * @param properties - The properties of the event.
 * @returns The formatted properties.
 * @see https://varsity.atlassian.net/wiki/spaces/ENG/pages/1234501678/Event+Standards
 */
function formatPropertyNames(properties?: EventProperties) {
  if (!properties) {
    return;
  }

  const formattedProperties: EventProperties = {};

  Object.keys(properties).forEach((key) => {
    formattedProperties[toSnakeCase(key)] = properties[key];
  });

  return formattedProperties;
}

export default formatPropertyNames;
