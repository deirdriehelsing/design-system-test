import type { NewRelic } from '../../types/newrelic';

declare global {
  interface Window {
    newrelic?: NewRelic;
  }
}

/**
 * Logs a handled error to New Relic if a `newrelic` object exists in the global namespace,
 * otherwise it will log to the console.
 */
function logHandledError(message: string, customAttributes?: Record<string, any> | undefined) {
  try {
    const logger = window?.newrelic?.log ?? console.info;
    logger(message, { customAttributes, level: 'debug' });
  } catch (error) {
    // Do nothing
  }
}

export default logHandledError;
