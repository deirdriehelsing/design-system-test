import * as index from '.';

describe('exports', () => {
  it.each([
    'fixtures',
    'mockFeatureFlags',
    'mockTranslations',
    'mockMatchMedia',
    'nock',
    'nocks',
    'nockApi',
    'IntegrationWrapper',
  ])(`%s`, (key) => {
    expect(index).toHaveProperty(key);
  });
});
