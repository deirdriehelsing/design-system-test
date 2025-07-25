type DrawerCloseReason =
  | 'backdropClick'
  | 'escapeKeyDown'
  | 'clickCloseButton'
  | 'clickCloseLink'
  | 'clickMinifyButton'
  | 'clickTriggerButton';

type DrawerOpenReason = 'clickOpenButton';

export type { DrawerCloseReason, DrawerOpenReason };
