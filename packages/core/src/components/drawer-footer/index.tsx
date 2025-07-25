import type { PropsWithChildren } from 'react';

import * as styles from './index.css';
import React from 'react';
import classNames from 'clsx';

interface DrawerFooterProps extends PropsWithChildren {
  className?: string;
}

function DrawerFooter({ children, className }: DrawerFooterProps) {
  return <footer className={classNames(styles.drawerFooter, className)}>{children}</footer>;
}

export default DrawerFooter;
