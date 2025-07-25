import type { MouseEvent } from 'react';

function preventFocusLoss(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}

export default preventFocusLoss;
