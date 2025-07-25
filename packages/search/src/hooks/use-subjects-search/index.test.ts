import { act, renderHook } from '@testing-library/react';
import mockedSearchResult from 'mocks/data/search-result.json';
import useAuthenticatedUser from '@blueshift-ui/auth/dist/hooks/use-authenticated-user';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useFeatureAccess from '@blueshift-ui/auth/dist/hooks/use-feature-access';
import useSubjectsSearch from '.';

const mockUseData = useData as jest.Mock;
const mockedUseAuthenticatedUser = useAuthenticatedUser as jest.Mock;
const mockedUseFeatureAccess = useFeatureAccess as jest.Mock;

jest.mock('@blueshift-ui/fetch/dist/hooks/use-data');
jest.mock('@blueshift-ui/auth/dist/hooks/use-authenticated-user');
jest.mock('@blueshift-ui/auth/dist/hooks/use-feature-access');

describe('useSubjectsSearch', () => {
  beforeEach(() => {
    mockedUseAuthenticatedUser.mockReturnValue({
      data: {
        product_state: 'vt4s',
      },
      isLoading: false,
    });

    mockedUseFeatureAccess.mockReturnValue({
      hasAccess: true,
    });
  });

  describe('results', () => {
    it('returns search data', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
      });

      const { result } = renderHook(() =>
        useSubjectsSearch({ initialSearchString: 'test2', initialFilters: { grades: '2' } })
      );

      expect(result.current).toStrictEqual({
        filters: { grades: '2' },
        results: mockedSearchResult,
        searchString: 'test2',
        setFilters: expect.any(Function),
        setSearchString: expect.any(Function),
        prevPage: expect.any(Function),
        nextPage: expect.any(Function),
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
        setPage: expect.any(Function),
      });
    });
  });

  describe('set search string', () => {
    it('returns search data', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
      });

      const { result } = renderHook(() => useSubjectsSearch());

      act(() => {
        result.current.setSearchString('test');
      });

      expect(result.current).toStrictEqual({
        filters: {},
        results: mockedSearchResult,
        searchString: 'test',
        setFilters: expect.any(Function),
        setSearchString: expect.any(Function),
        prevPage: expect.any(Function),
        nextPage: expect.any(Function),
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
        setPage: expect.any(Function),
      });
    });
  });

  describe('set filters', () => {
    it('returns search data', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
      });

      const { result } = renderHook(() => useSubjectsSearch());

      act(() => {
        result.current.setFilters({ grades: '1' });
      });

      expect(result.current).toStrictEqual({
        filters: { grades: '1' },
        results: mockedSearchResult,
        searchString: '',
        setFilters: expect.any(Function),
        setSearchString: expect.any(Function),
        prevPage: expect.any(Function),
        nextPage: expect.any(Function),
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
        setPage: expect.any(Function),
      });
    });
  });

  describe('next page', () => {
    it('updates page number on nextPage', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
      });

      const { result } = renderHook(() => useSubjectsSearch());

      act(() => {
        result.current.nextPage();
      });

      expect(result.current).toStrictEqual({
        filters: {},
        results: mockedSearchResult,
        searchString: '',
        setFilters: expect.any(Function),
        setSearchString: expect.any(Function),
        prevPage: expect.any(Function),
        nextPage: expect.any(Function),
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 2,
        setPage: expect.any(Function),
      });
    });

    it('does not update if it is in the last page', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 2,
      });

      const { result } = renderHook(() => useSubjectsSearch());

      act(() => {
        result.current.nextPage();
      });

      expect(result.current).toStrictEqual({
        filters: {},
        results: mockedSearchResult,
        searchString: '',
        setFilters: expect.any(Function),
        setSearchString: expect.any(Function),
        prevPage: expect.any(Function),
        nextPage: expect.any(Function),
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 2,
        setPage: expect.any(Function),
      });
    });
  });

  describe('prev page', () => {
    it('updates page number on prevPage', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 2,
      });

      const { result } = renderHook(() => useSubjectsSearch());

      act(() => {
        result.current.prevPage();
      });

      expect(result.current).toStrictEqual({
        filters: {},
        results: mockedSearchResult,
        searchString: '',
        setFilters: expect.any(Function),
        setSearchString: expect.any(Function),
        prevPage: expect.any(Function),
        nextPage: expect.any(Function),
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
        setPage: expect.any(Function),
      });
    });

    it('does not update if it is in the first page', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
      });

      const { result } = renderHook(() => useSubjectsSearch());

      act(() => {
        result.current.prevPage();
      });

      expect(result.current).toStrictEqual({
        filters: {},
        results: mockedSearchResult,
        searchString: '',
        setFilters: expect.any(Function),
        setSearchString: expect.any(Function),
        prevPage: expect.any(Function),
        nextPage: expect.any(Function),
        isLoading: false,
        isPreviousData: undefined,
        currentPage: 1,
        setPage: expect.any(Function),
      });
    });
  });
});
