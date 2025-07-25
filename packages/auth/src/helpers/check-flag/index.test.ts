import type { LDClient } from '../../types';

import checkFlag from '.';

describe('checkFlag()', () => {
  describe('when no flag is given', () => {
    it('returns true', () => {
      expect(checkFlag()).toBe(true);
    });
  });

  describe('when a function is given', () => {
    it('checks against the flags', () => {
      const mockFlagClient = { variation: jest.fn(() => true) };

      expect(
        checkFlag({
          flag: (flags) => {
            return !flags['flag-1'];
          },
          flagClient: mockFlagClient as LDClient,
        })
      ).toBe(true);
    });
  });
});
