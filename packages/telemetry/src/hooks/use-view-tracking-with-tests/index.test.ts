import { renderHook } from '@testing-library/react';
import useViewTracking from '../use-view-tracking';
import useViewTrackingWithTests from '.';

jest.mock('../use-view-tracking');

const mockedUseViewTracking = useViewTracking as jest.Mock;

describe('useViewTrackingWithTests', () => {
  const flags = {
    featureFlag1: true,
    featureFlag2: 'variant1',
  };

  const flagsData = [
    { name: 'featureFlag1', variations: [{ name: 'enabled', value: true }] },
    {
      name: 'featureFlag2',
      variations: [
        { name: 'variant1', value: 'variant1' },
        { name: 'variant2', value: 'variant2' },
      ],
    },
  ];

  it('tracks page load with the correct event data', () => {
    const category = 'test-category';

    renderHook(() =>
      useViewTrackingWithTests({
        action: 'loaded',
        category,
        flags,
        flagsData,
      })
    );

    expect(mockedUseViewTracking).toHaveBeenCalledWith(
      {
        action: 'loaded',
        category: 'test-category',
        tests: [
          { experimentId: 'featureFlag1', variantId: 'enabled' },
          { experimentId: 'featureFlag2', variantId: 'variant1' },
        ],
      },
      true
    );
  });
});
