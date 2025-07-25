import { ThemeProvider, Typography } from '.';

describe('package index', () => {
  describe('<ThemeProvider />', () => {
    it('is defined', () => {
      expect(ThemeProvider).toBeDefined();
    });
  });

  describe('<Typography />', () => {
    it('is defined', () => {
      expect(Typography).toBeDefined();
    });
  });
});
