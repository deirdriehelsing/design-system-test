import { analyticsBrowser } from '../../../../clients';
import { initializeGuidesAndSurveys } from '../../../../helpers';
import { renderHook } from '@testing-library/react';
import useGuidesAndSurveysInitialization from '.';

jest.mock('../../../../clients/analytics-browser');
jest.mock('../../../../helpers/initialize-guides-and-surveys');

describe('useGuidesAndSurveysInitialization()', () => {
  it('calls initializeGuidesAndSurveys with analyticsBrowser and apiKey when apiKey is provided', () => {
    const apiKey = 'test-api-key';

    renderHook(() => useGuidesAndSurveysInitialization(apiKey));

    expect(initializeGuidesAndSurveys).toHaveBeenCalledTimes(1);
    expect(initializeGuidesAndSurveys).toHaveBeenCalledWith(analyticsBrowser, apiKey);
  });

  it('calls initializeGuidesAndSurveys only on mount when apiKey does not change', () => {
    const apiKey = 'test-api-key';
    const { rerender } = renderHook(() => useGuidesAndSurveysInitialization(apiKey));

    expect(initializeGuidesAndSurveys).toHaveBeenCalledTimes(1);

    rerender();

    expect(initializeGuidesAndSurveys).toHaveBeenCalledTimes(1);
  });
});
