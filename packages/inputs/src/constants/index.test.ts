import * as exports from '.';

describe('constants index', () => {
  describe.each(['ThumbsRatingValues', 'ThumbsRatingVariants'])('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
