import type { ElementType, MouseEvent, PropsWithChildren, ReactNode } from 'react';
import type { DrawerCloseReason } from '../../types';
import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';

import * as styles from './index.css';
import React, { useEffect, useState } from 'react';
import { X as CloseIcon } from '@phosphor-icons/react';
import IconButton from '../icon-button';
import MuiDrawer from '@mui/material/Drawer';

interface TriggerProps extends PropsWithChildren<any> {
  onClick?: (event: React.MouseEvent<any>) => void;
  open?: boolean;
}

interface DrawerProps extends MuiDrawerProps {
  ariaLabel: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: (event: MouseEvent<any>, reason: DrawerCloseReason) => void;
  trigger?: ElementType;
  triggerProps?: TriggerProps;
  withAttachedTrigger?: boolean;
  withCloseButton?: boolean;
}

function Drawer({
  ariaLabel,
  anchor = 'left',
  children,
  isOpen = false,
  onClick,
  onClose,
  trigger: Trigger,
  triggerProps,
  withAttachedTrigger = false,
  withCloseButton = false,
  ...drawerProps
}: DrawerProps) {
  const [openState, setOpenState] = useState(isOpen);

  function handleClose(event: MouseEvent<any>, reason: DrawerCloseReason) {
    setOpenState(false);
    onClose?.(event, reason);
  }

  function handleCloseButtonClick(event: MouseEvent<HTMLButtonElement>) {
    handleClose(event, 'clickCloseButton');
  }

  function handleTriggerClick(event: MouseEvent<any>) {
    triggerProps?.onClick?.(event);
    setOpenState((openState) => !openState);
  }

  /* Side-Effects */

  useEffect(() => setOpenState(isOpen), [isOpen]);

  /* Render */

  const trigger = Trigger ? (
    <Trigger
      {...triggerProps}
      aria-controls="navigation-drawer"
      aria-expanded={openState}
      aria-haspopup={true}
      aria-label={ariaLabel}
      onClick={handleTriggerClick}
      open={openState}
    />
  ) : null;

  return (
    <>
      {!withAttachedTrigger && trigger}

      <MuiDrawer
        {...drawerProps}
        anchor={anchor}
        id="navigation-drawer"
        ModalProps={{ ...drawerProps.ModalProps, keepMounted: withAttachedTrigger }}
        onClick={onClick}
        onClose={handleClose}
        open={openState}
        PaperProps={{ className: styles.paper?.[anchor], ...drawerProps?.PaperProps }}
      >
        {withAttachedTrigger && trigger}

        {withCloseButton && (
          <IconButton
            aria-label="close drawer"
            className={styles.closeIcon?.[anchor]}
            onClick={handleCloseButtonClick}
          >
            <CloseIcon />
          </IconButton>
        )}

        {children}
      </MuiDrawer>
    </>
  );
}

export default Drawer;
