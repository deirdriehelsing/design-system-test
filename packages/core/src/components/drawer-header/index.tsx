import type { PropsWithChildren } from 'react';

import * as styles from './index.css';
import React from 'react';
import classNames from 'clsx';

interface DrawerHeaderProps extends PropsWithChildren {
  className?: string;
}

function DrawerHeader({ children, className }: DrawerHeaderProps) {
  return <header className={classNames(styles.drawerHeader, className)}>{children}</header>;
}

export default DrawerHeader;
