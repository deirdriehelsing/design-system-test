import * as exports from '.';

describe('component index', () => {
  describe.each([
    'Box',
    'Button',
    'Chip',
    'CircularProgress',
    'ClickAwayListener',
    'Collapse',
    'ConfigProvider',
    'Container',
    'Divider',
    'Drawer',
    'DrawerContent',
    'DrawerFooter',
    'DrawerHeader',
    'Fab',
    'Grow',
    'Icon',
    'IconButton',
    'LinearProgress',
    'Link',
    'List',
    'Markdown',
    'Paper',
    'Skeleton',
    'Stack',
    'Tooltip',
    'generateBlobBorderRadius',
    'useBlobBorderRadius',
    'useControlledState',
    'useStateMachine',
  ])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
