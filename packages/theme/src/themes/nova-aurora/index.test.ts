import novaAuroraThemeConfig from '.';

describe('{novaAuroraThemeConfig}', () => {
  it('provides correct members', () => {
    expect(novaAuroraThemeConfig.resourceImports).toBeDefined();
    expect(novaAuroraThemeConfig.theme).toBeDefined();
    expect(novaAuroraThemeConfig.tokens).toBeDefined();
  });
});
