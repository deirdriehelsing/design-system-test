import bossaAuroraThemeConfig from '.';

describe('{bossaAuroraThemeConfig}', () => {
  it('provides correct members', () => {
    expect(bossaAuroraThemeConfig.resourceImports).toBeDefined();
    expect(bossaAuroraThemeConfig.theme).toBeDefined();
    expect(bossaAuroraThemeConfig.tokens).toBeDefined();
  });
});
