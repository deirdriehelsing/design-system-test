import { act, renderHook } from '@testing-library/react';
import generateBlobBorderRadius from '../../helpers/generate-blob-border-radius';
import useBlobBorderRadius from '.';

const mockGenerateBlobBorderRadius = generateBlobBorderRadius as jest.Mock;

jest.mock('../../helpers/generate-blob-border-radius', () => jest.fn());

describe('useBlobBorderRadius()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('when not animated', () => {
    beforeAll(() => {
      mockGenerateBlobBorderRadius.mockReturnValueOnce('10% 50% 50% 10% / 50% 10% 50% 10%');
      mockGenerateBlobBorderRadius.mockReturnValue('10% 60% 60% 10% / 60% 10% 60% 10%');
    });

    afterAll(() => {
      jest.clearAllTimers();
    });

    it('returns a new, random border radius every interval', () => {
      const { result } = renderHook(() => useBlobBorderRadius({ animated: false }));
      expect(result.current).toBe('10% 50% 50% 10% / 50% 10% 50% 10%');

      act(() => {
        jest.advanceTimersByTime(7000);
      });

      expect(result.current).toBe('10% 50% 50% 10% / 50% 10% 50% 10%');
    });
  });
  describe('when animated', () => {
    beforeAll(() => {
      mockGenerateBlobBorderRadius.mockReturnValueOnce('10% 50% 50% 10% / 50% 10% 50% 10%');
      mockGenerateBlobBorderRadius.mockReturnValueOnce('10% 60% 60% 10% / 60% 10% 60% 10%');
      mockGenerateBlobBorderRadius.mockReturnValue('10% 70% 70% 10% / 70% 10% 70% 10%');
    });

    it('returns a new, random border radius every interval', () => {
      const { result } = renderHook(() => useBlobBorderRadius({ animated: true }));
      expect(result.current).toBe('10% 50% 50% 10% / 50% 10% 50% 10%');

      act(() => {
        jest.advanceTimersByTime(7000);
      });

      expect(result.current).toBe('10% 60% 60% 10% / 60% 10% 60% 10%');

      act(() => {
        jest.advanceTimersByTime(7000);
      });

      expect(result.current).toBe('10% 70% 70% 10% / 70% 10% 70% 10%');
    });
  });
});
