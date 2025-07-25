import { I18nProvider, RichTranslation, Translation, useRichTranslation, useTranslation } from '.';

describe('package index', () => {
  describe('<I18nProvider />', () => {
    it('is defined', () => {
      expect(I18nProvider).toBeDefined();
    });
  });

  describe('<RichTranslation />', () => {
    it('is defined', () => {
      expect(RichTranslation).toBeDefined();
    });
  });

  describe('<Translation />', () => {
    it('is defined', () => {
      expect(Translation).toBeDefined();
    });
  });

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
