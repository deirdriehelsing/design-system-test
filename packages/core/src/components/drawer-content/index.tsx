import type { PropsWithChildren } from 'react';

import * as styles from './index.css';
import React from 'react';
import classNames from 'clsx';

interface DrawerContentProps extends PropsWithChildren {
  className?: string;
}

function DrawerContent({ children, className }: DrawerContentProps) {
  return <div className={classNames(styles.drawerContent, className)}>{children}</div>;
}

export default DrawerContent;
