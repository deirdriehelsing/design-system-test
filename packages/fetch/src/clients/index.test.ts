import { AxiosClient, BaseClient, FetchClient, GraphQLClient, JsonApiClient } from '.';

describe('clients index', () => {
  describe('AxiosClient()', () => {
    it('is defined', () => {
      expect(AxiosClient).toBeDefined();
    });
  });

  describe('BaseClient()', () => {
    it('is defined', () => {
      expect(BaseClient).toBeDefined();
    });
  });

  describe('FetchClient()', () => {
    it('is defined', () => {
      expect(FetchClient).toBeDefined();
    });
  });

  describe('GraphQLClient()', () => {
    it('is defined', () => {
      expect(GraphQLClient).toBeDefined();
    });
  });

  describe('JsonApiClient()', () => {
    it('is defined', () => {
      expect(JsonApiClient).toBeDefined();
    });
  });
});
