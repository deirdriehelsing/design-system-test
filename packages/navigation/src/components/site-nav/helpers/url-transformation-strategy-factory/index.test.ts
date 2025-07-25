import type { SiteNavApplicationId } from '../../../../types';

import {
  clientAccountUrlTransformationStrategy,
  defaultUrlTransformationStrategy,
} from '../url-transformation-strategies';
import urlTransformationStrategyFactory from './index';

jest.mock('../url-transformation-strategies', () => ({
  defaultUrlTransformationStrategy: jest.fn(),
  clientAccountUrlTransformationStrategy: jest.fn(),
}));

const mockedDefaultUrlTransformationStrategy =
  defaultUrlTransformationStrategy as jest.MockedFunction<typeof defaultUrlTransformationStrategy>;
const mockedClientAccountUrlTransformationStrategy =
  clientAccountUrlTransformationStrategy as jest.MockedFunction<
    typeof clientAccountUrlTransformationStrategy
  >;

describe('urlTransformationStrategyFactory', () => {
  const baseURL = 'https://example.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns clientAccountUrlTransformationStrategy when currentApplicationId is client-account', () => {
    const options = {
      currentApplicationId: 'client-account' as SiteNavApplicationId,
      baseURL,
    };

    urlTransformationStrategyFactory(options);

    expect(mockedClientAccountUrlTransformationStrategy).toHaveBeenCalledWith({
      currentApplicationId: 'client-account',
      baseURL,
    });
    expect(mockedClientAccountUrlTransformationStrategy).toHaveBeenCalledTimes(1);
    expect(mockedDefaultUrlTransformationStrategy).not.toHaveBeenCalled();
  });

  it('returns defaultUrlTransformationStrategy when currentApplicationId is not client-account', () => {
    const options = {
      currentApplicationId: 'other-app' as SiteNavApplicationId,
      baseURL,
    };

    urlTransformationStrategyFactory(options);

    expect(mockedDefaultUrlTransformationStrategy).toHaveBeenCalledWith();
    expect(mockedDefaultUrlTransformationStrategy).toHaveBeenCalledTimes(1);
    expect(mockedClientAccountUrlTransformationStrategy).not.toHaveBeenCalled();
  });

  it('returns defaultUrlTransformationStrategy when currentApplicationId is undefined', () => {
    const options = {
      baseURL,
    };

    urlTransformationStrategyFactory(options);

    expect(mockedDefaultUrlTransformationStrategy).toHaveBeenCalledWith();
    expect(mockedDefaultUrlTransformationStrategy).toHaveBeenCalledTimes(1);
    expect(mockedClientAccountUrlTransformationStrategy).not.toHaveBeenCalled();
  });

  it('passes baseURL parameter correctly to clientAccountUrlTransformationStrategy', () => {
    const customBaseURL = 'https://account.vtstaging.com/client';
    const options = {
      currentApplicationId: 'client-account' as SiteNavApplicationId,
      baseURL: customBaseURL,
    };

    urlTransformationStrategyFactory(options);

    expect(mockedClientAccountUrlTransformationStrategy).toHaveBeenCalledWith({
      currentApplicationId: 'client-account',
      baseURL: customBaseURL,
    });
  });
});
