import type { DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';

import * as styles from './index.css';
import { X as CloseIcon } from '@phosphor-icons/react';
import Divider from '@blueshift-ui/core/dist/components/divider';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import MuiDialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import classNames from 'clsx';

type HeadingProps = {
  AlertComponent?: React.ElementType;
  dialogTitleProps?: MuiDialogTitleProps<'div'>;
  onClose?: () => void;
  showCloseButton?: boolean;
  showHeading?: boolean;
  title?: React.ReactNode;
  topContent?: React.ReactNode;
  withDividers?: boolean;
};

function Heading({
  AlertComponent,
  dialogTitleProps,
  showCloseButton,
  showHeading,
  title,
  topContent,
  onClose,
  withDividers,
}: HeadingProps) {
  return (
    <>
      {showCloseButton && (
        <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
          <CloseIcon className={styles.closeIcon} weight="bold" />
        </IconButton>
      )}

      {showHeading && (
        <MuiDialogTitle component="div" variant="titleLargeProminent" {...dialogTitleProps}>
          <div
            className={classNames(styles.titleContent, {
              [styles.titleContentWithCloseButton]: showCloseButton && !topContent,
            })}
          >
            {AlertComponent && <AlertComponent />}
            {topContent && <div className={styles.topContent}>{topContent}</div>}
            {title}
          </div>
        </MuiDialogTitle>
      )}

      {withDividers && <Divider />}
    </>
  );
}

export default Heading;
