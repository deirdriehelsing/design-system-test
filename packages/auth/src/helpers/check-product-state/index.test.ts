import type { UserProductState } from '../../types';

import checkProductState from '.';

describe('checkProductState()', () => {
  describe('when no product state is given', () => {
    it('returns true', () => {
      expect(checkProductState()).toBe(true);
    });
  });

  describe('when user has no product state', () => {
    it('returns false', () => {
      expect(checkProductState({ productState: 'free_class' })).toBe(false);
    });
  });

  describe('when product state is given', () => {
    it.each<[UserProductState, boolean]>([
      ['tutoring', false],
      ['free_class', true],
    ])(
      'checks for the given product state against the user product state',
      (productState, expectation) => {
        expect(checkProductState({ productState, userProductState: 'free_class' })).toBe(
          expectation
        );
      }
    );

    describe('when a function is given', () => {
      it('returns true according to the given function', () => {
        expect(
          checkProductState({
            productState(userProductState) {
              return userProductState !== 'free_class';
            },
            userProductState: 'one_on_one_membership',
          })
        ).toBe(true);
      });

      it('returns false according to the given function', () => {
        expect(
          checkProductState({
            productState(userProductState) {
              return userProductState !== 'free_class';
            },
            userProductState: 'free_class',
          })
        ).toBe(false);
      });
    });
  });
});
