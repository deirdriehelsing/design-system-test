import * as exports from '.';

describe('theme index', () => {
  describe.each(['novaAuroraThemeConfig', 'solarMaximaThemeConfig'])('{%s}', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
