import {
  AxiosClient,
  BaseClient,
  FetchClient,
  FetchProvider,
  GraphQLClient,
  JsonApiClient,
  makeRequest,
  parseRequestKey,
  useAxiosClient,
  useData,
  useGraphqlClient,
  useInfiniteData,
  useIsFetching,
  useMutation,
  useQueryClient,
} from '.';

describe('package index', () => {
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

  describe('<FetchProvider />', () => {
    it('is defined', () => {
      expect(FetchProvider).toBeDefined();
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

  describe('makeRequest()', () => {
    it('is defined', () => {
      expect(makeRequest).toBeDefined();
    });
  });

  describe('parseRequestKey()', () => {
    it('is defined', () => {
      expect(parseRequestKey).toBeDefined();
    });
  });

  describe('useAxiosClient()', () => {
    it('is defined', () => {
      expect(useAxiosClient).toBeDefined();
    });
  });

  describe('useData()', () => {
    it('is defined', () => {
      expect(useData).toBeDefined();
    });
  });

  describe('useGraphqlClient()', () => {
    it('is defined', () => {
      expect(useGraphqlClient).toBeDefined();
    });
  });

  describe('useInfiniteData()', () => {
    it('is defined', () => {
      expect(useInfiniteData).toBeDefined();
    });
  });

  describe('useIsFetching()', () => {
    it('is defined', () => {
      expect(useIsFetching).toBeDefined();
    });
  });

  describe('useMutation()', () => {
    it('is defined', () => {
      expect(useMutation).toBeDefined();
    });
  });

  describe('useQueryClient()', () => {
    it('is defined', () => {
      expect(useQueryClient).toBeDefined();
    });
  });
});
