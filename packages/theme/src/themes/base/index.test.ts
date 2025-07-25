import baseThemeConfig from '.';

describe('{baseThemeConfig}', () => {
  it('provides correct members', () => {
    expect(baseThemeConfig.resourceImports).toBeDefined();
    expect(baseThemeConfig.theme).toBeDefined();
    expect(baseThemeConfig.tokens).toBeDefined();
  });
});
