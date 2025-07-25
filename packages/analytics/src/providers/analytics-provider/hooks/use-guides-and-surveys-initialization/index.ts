import { analyticsBrowser } from '../../../../clients';
import { initializeGuidesAndSurveys } from '../../../../helpers';
import { useEffect } from 'react';

/**
 * Initializes Amplitude's guides and surveys feature.
 */
function useGuidesAndSurveysInitialization(apiKey?: string) {
  useEffect(() => {
    initializeGuidesAndSurveys(analyticsBrowser, apiKey);
  }, [apiKey]);
}

export default useGuidesAndSurveysInitialization;
