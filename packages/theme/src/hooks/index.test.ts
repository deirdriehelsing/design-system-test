import { useBreakpoints, useMediaQuery, useTheme } from '.';

describe('hooks index', () => {
  describe('useBreakpoints()', () => {
    it('is defined', () => {
      expect(useBreakpoints).toBeDefined();
    });
  });

  describe('useMediaQuery()', () => {
    it('is defined', () => {
      expect(useMediaQuery).toBeDefined();
    });
  });

  describe('useTheme()', () => {
    it('is defined', () => {
      expect(useTheme).toBeDefined();
    });
  });
});
