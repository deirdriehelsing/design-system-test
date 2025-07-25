import { useClassesSearch, useSubjectsSearch } from '.';

describe('package index', () => {
  describe('useClassesSearch', () => {
    it('is defined', () => {
      expect(useClassesSearch).toBeDefined();
    });
  });

  describe('useSubjectsSearch', () => {
    it('is defined', () => {
      expect(useSubjectsSearch).toBeDefined();
    });
  });
});
