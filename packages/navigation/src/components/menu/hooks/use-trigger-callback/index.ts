import type { MenuTriggerProps } from '../../../../types';
import type { PopupState } from 'material-ui-popup-state/hooks';

import { bindTrigger } from 'material-ui-popup-state/hooks';
import { useCallback } from 'react';

function useTriggerCallback(
  name: 'onClick' | 'onTouchStart',
  triggerProps: MenuTriggerProps,
  popupState: PopupState,
  callback?: (event: any) => void
) {
  return useCallback(
    (event: any) => {
      callback?.(event);

      if (!event.isPropagationStopped()) {
        bindTrigger(popupState)[name](event);
        triggerProps[name]?.(event);
      }
    },
    [popupState, name, triggerProps, callback]
  );
}

export default useTriggerCallback;
