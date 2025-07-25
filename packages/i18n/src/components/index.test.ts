import { I18nProvider, RichTranslation, Translation } from '.';

describe('components index', () => {
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
});
