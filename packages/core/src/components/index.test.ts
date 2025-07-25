import * as exports from '.';

describe('component index', () => {
  describe.each([
    'Box',
    'Button',
    'Chip',
    'CircularProgress',
    'ClickAwayListener',
    'Collapse',
    'Container',
    'Divider',
    'Drawer',
    'DrawerContent',
    'DrawerFooter',
    'DrawerHeader',
    'Fab',
    'Fade',
    'Grow',
    'Icon',
    'IconButton',
    'LinearProgress',
    'Link',
    'List',
    'Markdown',
    'Paper',
    'RoundButton',
    'Skeleton',
    'Slide',
    'Stack',
    'Tooltip',
  ])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
