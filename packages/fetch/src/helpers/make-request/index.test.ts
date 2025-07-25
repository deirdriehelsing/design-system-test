import type { ClientAdapter } from '../../types';

import makeRequest, { deprecationMessage } from '.';
import { AxiosClient } from '../../clients/axios';

jest.mock('../../clients/axios');

const MockedAxiosClient = AxiosClient as jest.Mock;

class MockClient implements ClientAdapter {
  public readonly instance = jest.fn();

  public makeRequest = jest.fn();
}

describe('makeRequest()', () => {
  it('logs a deprecation warning', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});

    makeRequest({ url: '/mock' });

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(deprecationMessage);
  });

  describe('when using the default client', () => {
    it('forwards options to a new client instance', () => {
      jest.spyOn(console, 'warn').mockImplementationOnce(() => {}); // silents deprecation warning in console
      const options = { url: '/mock' };

      makeRequest(options);

      expect(MockedAxiosClient).toHaveBeenCalledTimes(1);
      expect(MockedAxiosClient).toHaveBeenCalledWith(options);
    });

    it('makes a request with the given options using a new client instance', () => {
      jest.spyOn(console, 'warn').mockImplementationOnce(() => {}); // silents deprecation warning in console
      const mockedMakeRequest = jest.fn();

      MockedAxiosClient.mockReturnValueOnce({ makeRequest: mockedMakeRequest });

      const options = { url: '/mock' };

      makeRequest(options);

      expect(mockedMakeRequest).toHaveBeenCalledTimes(1);
      expect(mockedMakeRequest).toHaveBeenCalledWith(options);
    });
  });

  describe('when using a custom client', () => {
    it('makes a request with the given options using the given client instance', () => {
      jest.spyOn(console, 'warn').mockImplementationOnce(() => {}); // silents deprecation warning in console
      const mockClient = new MockClient();

      const options = { url: '/mock' };

      makeRequest(options, mockClient);

      expect(mockClient.makeRequest).toHaveBeenCalledTimes(1);
      expect(mockClient.makeRequest).toHaveBeenCalledWith(options);
    });
  });
});
