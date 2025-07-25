import { useRichTranslation, useTranslation } from '.';

describe('hooks index', () => {
  describe('useRichTranslation()', () => {
    it('is defined', () => {
      expect(useRichTranslation).toBeDefined();
    });
  });

  describe('useTranslation()', () => {
    it('is defined', () => {
      expect(useTranslation).toBeDefined();
    });
  });
});
