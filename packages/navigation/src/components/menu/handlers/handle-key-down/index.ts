import type { KeyboardEvent } from 'react';

// This fixes a problem with nested menus where the parent menu
// Keyboard events interfere with nested menu keyboard events
function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
  event.stopPropagation();
}

export default handleKeyDown;
