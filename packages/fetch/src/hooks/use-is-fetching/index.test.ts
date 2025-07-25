import useIsFetching, { defaultFilters } from '.';
import { renderHook } from '@testing-library/react';
import { useIsFetching as useReactQueryIsFetching } from '@tanstack/react-query';

const mockedUseReactQueryIsFetching = useReactQueryIsFetching as jest.Mock;

jest.mock('@tanstack/react-query');

describe('useIsFetching()', () => {
  beforeEach(() => {
    mockedUseReactQueryIsFetching.mockClear();
  });

  it('calls react query useIsFetching', () => {
    renderHook(() => useIsFetching());

    expect(mockedUseReactQueryIsFetching).toHaveBeenCalledTimes(1);
  });

  it('forwards options to react query useIsFetching', () => {
    const options = {
      queryKey: ['mock'],
    };

    renderHook(() => useIsFetching(options));

    expect(mockedUseReactQueryIsFetching).toHaveBeenCalledTimes(1);
    expect(mockedUseReactQueryIsFetching).toHaveBeenCalledWith(options);
  });

  it('returns what react query useIsFetching returns', () => {
    mockedUseReactQueryIsFetching.mockReturnValueOnce('mock');

    const { result } = renderHook(() => useIsFetching());

    expect(mockedUseReactQueryIsFetching).toHaveBeenCalledTimes(1);
    expect(result.current).toBe('mock');
  });

  it('uses a default filters when none are provided', () => {
    renderHook(() => useIsFetching());

    expect(mockedUseReactQueryIsFetching).toHaveBeenCalledTimes(1);
    expect(mockedUseReactQueryIsFetching).toHaveBeenCalledWith(defaultFilters);
  });
});
