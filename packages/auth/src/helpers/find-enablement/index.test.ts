import type { Student } from '../../types';

import findEnablement from '.';

describe('findEnablement()', () => {
  const mockEnablement = { product: { short_name: 'active_membership' } };
  const mockStudentsWithEnablement = [
    { uuid: 'mock-student-uuid' },
    { uuid: 'mock-student-uuid-2', enablements: [mockEnablement] },
  ] as Student[];
  const mockStudentsWithoutEnablement = [
    { uuid: 'mock-student-uuid' },
    { uuid: 'mock-student-uuid-2', enablements: [] },
  ] as Student[];

  describe('when students are not present', () => {
    it('returns null', () => {
      expect(
        findEnablement({
          enablementShortName: 'active_membership',
        })
      ).toEqual(null);

      expect(
        findEnablement({
          enablementShortName: 'active_membership',
          students: [],
        })
      ).toEqual(null);
    });
  });

  describe('when students are present', () => {
    describe('when enablement is not present', () => {
      it('returns null', () => {
        expect(
          findEnablement({
            enablementShortName: 'active_membership',
            students: mockStudentsWithoutEnablement,
          })
        ).toEqual(null);
      });
    });

    describe('when enablement is present', () => {
      it('returns enablement', () => {
        expect(
          findEnablement({
            enablementShortName: 'active_membership',
            students: mockStudentsWithEnablement,
          })
        ).toEqual({
          product: { short_name: 'active_membership' },
        });
      });
    });
  });
});
