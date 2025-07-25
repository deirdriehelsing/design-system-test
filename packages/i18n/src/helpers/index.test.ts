import * as exports from '.';

describe('helper index', () => {
  describe.each(['fetchTranslationsJSON', 'requestTranslation', 'requestTranslationFile'])(
    '%s()',
    (moduleName) => {
      it('is defined', () => {
        expect((exports as any)[moduleName]).toBeDefined();
      });
    }
  );
});
