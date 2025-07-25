import { renderHook } from '@testing-library/react';
import useBreakpoints from '.';

const mockedUseMediaQuery = jest.fn<boolean, any>();

jest.mock('../use-media-query', () => {
  return () => mockedUseMediaQuery();
});

describe('useBreakpoints()', () => {
  afterAll(() => {
    mockedUseMediaQuery.mockRestore();
  });

  describe.each([
    { viewport: 'small' },
    { viewport: 'medium' },
    { viewport: 'large' },
    { viewport: 'extra-large' },
  ])('when on $viewport viewport', ({ viewport }) => {
    beforeEach(() => {
      mockedUseMediaQuery
        .mockImplementationOnce(() => viewport === 'small') // isSmallViewport
        .mockImplementationOnce(() => viewport === 'medium') // isMediumViewport
        .mockImplementationOnce(() => viewport === 'large') // isLargeViewport
        .mockImplementationOnce(() => viewport === 'extra-large'); // isExtraLargeViewport
    });

    it.each([
      { viewport: 'small', key: 'isSmallViewport', isViewport: viewport === 'small' },
      { viewport: 'medium', key: 'isMediumViewport', isViewport: viewport === 'medium' },
      { viewport: 'large', key: 'isLargeViewport', isViewport: viewport === 'large' },
      {
        viewport: 'extra-large',
        key: 'isExtraLargeViewport',
        isViewport: viewport === 'extra-large',
      },
    ])('should return correct $viewport viewport boolean flag', ({ key, isViewport }) => {
      const { result } = renderHook(() => useBreakpoints());

      expect(result.current[key]).toBe(isViewport);
    });
  });
});
