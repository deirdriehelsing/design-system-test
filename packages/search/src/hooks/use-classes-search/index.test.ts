import { act, renderHook } from '@testing-library/react';
import mockedSearchResult from 'mocks/data/search-result.json';
import useClassesSearch from '.';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';

const mockUseData = useData as jest.Mock;

jest.mock('@blueshift-ui/fetch/dist/hooks/use-data');

describe('useClassesSearch', () => {
  describe('results', () => {
    it('returns search data', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        currentPage: 1,
      });

      const { result } = renderHook(() =>
        useClassesSearch({ initialSearchString: 'test2', initialFilters: { grades: '2' } })
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
        currentPage: 1,
      });

      const { result } = renderHook(() => useClassesSearch());

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
        currentPage: 1,
      });

      const { result } = renderHook(() => useClassesSearch());

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
        currentPage: 1,
      });

      const { result } = renderHook(() => useClassesSearch());

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
        currentPage: 2,
        setPage: expect.any(Function),
      });
    });

    it('does not update if it is in the last page', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        currentPage: 2,
      });

      const { result } = renderHook(() => useClassesSearch());

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
        currentPage: 2,
      });

      const { result } = renderHook(() => useClassesSearch());

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
        currentPage: 1,
        setPage: expect.any(Function),
      });
    });

    it('does not update if it is in the first page', () => {
      mockUseData.mockReturnValue({
        data: mockedSearchResult,
        isLoading: false,
        currentPage: 1,
      });

      const { result } = renderHook(() => useClassesSearch());

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
        currentPage: 1,
        setPage: expect.any(Function),
      });
    });
  });
});
