import * as exports from '.';

describe('<ThumbsRating /> components index', () => {
  describe.each(['ThumbButton'])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
