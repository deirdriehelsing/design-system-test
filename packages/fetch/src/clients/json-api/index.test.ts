import BaseClient from '../base';
import JsonApiClient from '../json-api';
import { expectToThrow } from 'helpers/expect-to-throw';

jest.mock(
  'jsona',
  () =>
    class {
      deserialize = () => ({ isDeserialized: true });
      serialize = () => ({ isSerialized: true });
    }
);

const mockedAddJsonApiInterceptors = jest.fn();
const mockedCreateInstance = jest.fn();

// JsonApiClient is an abstract class and needs another class to extend it
class MockClient extends JsonApiClient<any, any> {
  public async makeRequest(options: any): Promise<any> {}

  protected addJsonApiInterceptors(...args: any[]) {
    return mockedAddJsonApiInterceptors(...args);
  }

  protected createInstance(...args: any[]) {
    return mockedCreateInstance(...args);
  }
}

describe('JsonApiClient', () => {
  beforeEach(() => {
    mockedAddJsonApiInterceptors.mockClear();
    mockedCreateInstance.mockClear();
  });

  it('is an abstract class', () => {
    expectToThrow(() => {
      // We need to disable this safety check to test the abstract class
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const client = new JsonApiClient();
      client.makeRequest('/mock');
    });
  });

  it('extends BaseClient', () => {
    const client = new MockClient();

    expect(client).toBeInstanceOf(BaseClient);
  });

  describe('when json api flag is not active', () => {
    it('does not call method to add interceptors', () => {
      new MockClient({
        isJsonApi: false,
      });

      expect(mockedAddJsonApiInterceptors).not.toHaveBeenCalled();
    });
  });

  describe('when json api flag is active', () => {
    it('calls method to add interceptors', () => {
      const mockClient = jest.fn();
      mockedCreateInstance.mockReturnValueOnce(mockClient);
      const jsonApiOptions = { mock: true };
      new MockClient({ isJsonApi: true, jsonApiOptions });

      expect(mockedAddJsonApiInterceptors).toHaveBeenCalledTimes(1);
      expect(mockedAddJsonApiInterceptors).toHaveBeenCalledWith(mockClient, jsonApiOptions);
    });
  });
});
