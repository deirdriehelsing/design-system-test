import { renderHook } from '@testing-library/react';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useRawFeatureFlagData from '.';

const MOCK_FEATURE_FLAGS = [
  { name: 'featureFlag1', variations: [{ name: 'enabled', value: true }] },
  {
    name: 'featureFlag2',
    variations: [
      { name: 'variant1', value: 'variant1' },
      { name: 'variant2', value: 'variant2' },
    ],
  },
];
const MOCK_TAG = 'test';

const useDataMock = useData as jest.Mock;

jest.mock('@blueshift-ui/fetch/dist/hooks/use-axios-client', () => () => 'mock-axios-client');
jest.mock('@blueshift-ui/fetch/dist/hooks/use-data');

describe('useRawFeatureFlagData()', () => {
  beforeEach(() => {
    useDataMock.mockReturnValue({
      data: { items: MOCK_FEATURE_FLAGS },
      isLoading: false,
    });
  });

  it('calls useData correctly', () => {
    renderHook(() => useRawFeatureFlagData({ tag: MOCK_TAG }));

    expect(useDataMock).toHaveBeenCalledWith({
      queryKey: ['useRawFeatureFlagData', 'test'],
      queryOptions: {
        meta: {
          client: 'mock-axios-client',
        },
        select: expect.any(Function),
      },
      request: {
        headers: {
          Authorization: expect.any(String),
        },
        params: {
          tag: 'test',
        },
        url: expect.stringContaining('/flags/'),
      },
    });
  });

  describe('select()', () => {
    it('returns expected data', () => {
      renderHook(() => useRawFeatureFlagData({ tag: MOCK_TAG }));

      const select = useDataMock.mock.calls[0][0].queryOptions?.select;

      expect(select({ items: MOCK_FEATURE_FLAGS })).toEqual(MOCK_FEATURE_FLAGS);
    });
  });
});
