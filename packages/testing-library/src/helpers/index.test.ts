import * as index from '.';

describe('exports', () => {
  it.each([
    'headers',
    'nockApi',
    'nock',
    'mockFeatureFlags',
    'mockMatchMedia',
    'mockTranslations',
    'IntegrationWrapper',
    'nocks',
  ])(`%s`, (key) => {
    expect(index).toHaveProperty(key);
  });
});
