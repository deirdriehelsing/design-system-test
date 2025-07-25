import type { ReactNode } from 'react';

function formatTitle(title: ReactNode, maxLength?: number) {
  if (!maxLength || typeof title !== 'string' || title.length <= maxLength) {
    return title;
  }

  return `${title.slice(0, maxLength)}…`;
}

export default formatTitle;
