import type { TextFieldClearButtonProps } from '../../../types';

import { XCircle as CloseIcon } from '@phosphor-icons/react';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import React from 'react';
import preventFocusLoss from './helpers/prevent-focus-loss';

function TextFieldClearButton({
  onClear,
  onVisibilityChange,
  value,
  ...muiIconButtonProps
}: TextFieldClearButtonProps) {
  const [isVisible, setIsVisible] = React.useState(Boolean(value));

  /* Side-Effects */

  React.useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  React.useEffect(() => {
    setIsVisible(value !== '');
  }, [value]);

  /* Render */

  return (
    <IconButton
      aria-label="clear button"
      classes={{ root: 'BlueshiftClearButton' }}
      {...muiIconButtonProps}
      onClick={onClear}
      onMouseDown={preventFocusLoss}
      sx={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <CloseIcon weight="fill" />
    </IconButton>
  );
}

export default TextFieldClearButton;
