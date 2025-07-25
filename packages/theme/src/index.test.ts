import * as exports from '.';

describe('package index', () => {
  describe.each([
    'ThemeProvider',
    'Typography',
    'novaAuroraThemeConfig',
    'solarMaximaThemeConfig',
    'useMediaQuery',
    'useTheme',
  ])('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
