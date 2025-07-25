import type { TrackedDialogProps } from '../../types';

import { useCallback, useEffect } from 'react';
import { Dialog } from '@blueshift-ui/feedback';
import { useElementVisibilityHandlers } from '../../hooks';

/**
 * @deprecated this component will be removed in v5. Use the event handler hooks instead.
 */
function TrackedDialog({
  id,
  onClose,
  open,
  trackedProperties,
  ...dialogProps
}: TrackedDialogProps) {
  const { handleElementClosed, handleElementOpened } = useElementVisibilityHandlers({
    elementType: 'dialog',
    id,
    trackedProperties,
  });

  const handleClose = useCallback(
    // Note, this handler has a high likelihood of updating frequently due to the dependency on the
    // onClose and handleElementClosed. There's not a good way to enforce their stability.
    () => {
      handleElementClosed();

      // This needs to be called last so we can guarantee that the tracked analytic properties are
      // correct (e.g., page_path)
      onClose?.();
    },
    [handleElementClosed, onClose]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    handleElementOpened();
  }, [handleElementOpened, open]);

  return <Dialog {...dialogProps} id={id} onClose={handleClose} open={open} />;
}

export default TrackedDialog;
