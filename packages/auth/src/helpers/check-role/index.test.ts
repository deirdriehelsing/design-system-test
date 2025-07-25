import type { UserRole } from '../../types';

import checkRole from '.';

describe('checkRole()', () => {
  describe('when no role is given', () => {
    it('returns true', () => {
      expect(checkRole()).toBe(true);
    });
  });

  describe('when user has no role', () => {
    it('returns false', () => {
      expect(checkRole({ role: 'student' })).toBe(false);
    });
  });

  describe('when role is given', () => {
    it.each<[UserRole, boolean]>([
      ['client', false],
      ['student', true],
    ])('checks for the given role against the user role', (role, expectation) => {
      expect(checkRole({ role, userRole: 'student' })).toBe(expectation);
    });

    describe('when a function is given', () => {
      it('returns true according to the given function', () => {
        expect(
          checkRole({
            role(userRole) {
              return userRole !== 'student';
            },
            userRole: 'client',
          })
        ).toBe(true);
      });

      it('returns false according to the given function', () => {
        expect(
          checkRole({
            role(userRole) {
              return userRole !== 'student';
            },
            userRole: 'student',
          })
        ).toBe(false);
      });
    });
  });
});
