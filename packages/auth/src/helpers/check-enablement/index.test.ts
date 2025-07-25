import type { Student } from '../../types';

import checkEnablement from '.';

describe('checkEnablement()', () => {
  describe('when no enablement is given', () => {
    it('returns true', () => {
      expect(checkEnablement()).toBe(true);
    });
  });

  describe('when there are no students present', () => {
    it('returns false', () => {
      expect(checkEnablement({ enablement: 'mock' })).toBe(false);
    });
  });

  describe('when there are students present', () => {
    const mockStudents = [
      { enablements: [] },
      { enablements: [{ product: { short_name: 'some_enablement' } }] },
    ] as Student[];

    it.each([
      ['some_enablement', true],
      ['another_enablement', false],
    ])('returns correct result when passed an enablement short name', (enablement, expectation) => {
      expect(checkEnablement({ enablement, students: mockStudents })).toBe(expectation);
    });

    it('returns correct result when passed a custom enablement checker function', () => {
      expect(checkEnablement({ enablement: () => true, students: mockStudents })).toBe(true);
    });
  });
});
