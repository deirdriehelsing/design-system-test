import {
  useAxiosClient,
  useData,
  useGraphqlClient,
  useInfiniteData,
  useIsFetching,
  useMutation,
  usePusherChannel,
  usePusherInstance,
  useQueryClient,
} from '.';

describe('hooks index', () => {
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

  describe('usePusherChannel()', () => {
    it('is defined', () => {
      expect(usePusherChannel).toBeDefined();
    });
  });

  describe('usePusherInstance()', () => {
    it('is defined', () => {
      expect(usePusherInstance).toBeDefined();
    });
  });

  describe('useQueryClient()', () => {
    it('is defined', () => {
      expect(useQueryClient).toBeDefined();
    });
  });
});
