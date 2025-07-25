import solarMaximaThemeConfig from '.';

describe('{solarMaximaThemeConfig}', () => {
  it('provides correct members', () => {
    expect(solarMaximaThemeConfig.resourceImports).toBeDefined();
    expect(solarMaximaThemeConfig.theme).toBeDefined();
    expect(solarMaximaThemeConfig.tokens).toBeDefined();
  });
});
