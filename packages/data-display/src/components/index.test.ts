import * as exports from '.';

describe('component index', () => {
  describe.each([
    'Avatar',
    'Badge',
    'Carousel',
    'DataGrid',
    'ExpandableContent',
    'LineChart',
    'PieChart',
    'VideoPlayer',
  ])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
