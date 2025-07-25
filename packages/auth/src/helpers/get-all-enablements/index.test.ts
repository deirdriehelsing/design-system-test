import type { Student } from '../../types';

import getAllEnablements from '.';

describe('getAllEnablements()', () => {
  const mockEnablementA = { product: { short_name: 'mock_enablement_a' } };
  const mockEnablementB = { product: { short_name: 'mock_enablement_b' } };
  const mockStudents = [
    { uuid: 'mock-student-uuid-1', enablements: [mockEnablementA] },
    { uuid: 'mock-student-uuid-2', enablements: [mockEnablementB] },
    { uuid: 'mock-student-uuid-3', enablements: [mockEnablementB] },
  ] as Student[];

  describe('when students are not present', () => {
    it('returns an empty array', () => {
      expect(getAllEnablements()).toEqual([]);
      expect(getAllEnablements([])).toEqual([]);
    });
  });

  describe('when students are present', () => {
    it('returns all enablements for provided students', () => {
      expect(getAllEnablements(mockStudents)).toEqual([
        mockEnablementA,
        mockEnablementB,
        mockEnablementB,
      ]);
    });
  });

  describe('when unique option is `true`', () => {
    it('returns all enablements for provided students', () => {
      expect(getAllEnablements(mockStudents, { unique: true })).toEqual([
        mockEnablementA,
        mockEnablementB,
      ]);
    });
  });
});
