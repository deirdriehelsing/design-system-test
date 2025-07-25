import type { DialogProps } from '../../types';

import * as styles from './index.css';
import Actions from './components/Actions';
import Heading from './components/Heading';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogContent from '@mui/material/DialogContent';
import classNames from 'clsx';

function Dialog({
  actions,
  anchor,
  children,
  dialogActionsProps,
  dialogContentProps,
  dialogTitleProps,
  fullScreen,
  onClose,
  rightContent,
  title,
  topContent,
  withCloseButton,
  withDividers,
  ...dialogProps
}: DialogProps) {
  const anchorBottom = anchor === 'bottom';
  const showCloseButton = fullScreen || withCloseButton || anchorBottom;
  const showHeading = title || dialogProps.slots?.alert || topContent;
  const { className, ...restDialogProps } = dialogProps;

  return (
    <MuiDialog
      classes={{
        ...dialogProps.classes,
        paper: classNames(dialogProps.classes?.paper, {
          [styles.resetRoot]: !fullScreen,
        }),
      }}
      className={classNames(className, {
        [styles.anchorBottom]: anchorBottom,
      })}
      fullScreen={fullScreen}
      onClose={onClose}
      {...restDialogProps}
    >
      <div className={styles.container}>
        {rightContent && (
          <div className={classNames(styles.rightContent, styles.rightContentDesktop)}>
            {rightContent}
          </div>
        )}

        <div
          className={classNames(
            styles.mainContent,
            styles.mainContentMaxWidth?.[dialogProps.maxWidth ? dialogProps.maxWidth : 'sm'],
            {
              [styles.mainContentNoHeading]: !showHeading,
              [styles.mainContentFullScreen]: fullScreen,
              [styles.mainContentFullWidth]: dialogProps.fullWidth,
            }
          )}
        >
          <Heading
            AlertComponent={dialogProps.slots?.alert}
            dialogTitleProps={dialogTitleProps}
            onClose={onClose}
            showCloseButton={showCloseButton}
            showHeading={Boolean(showHeading)}
            title={title}
            topContent={topContent}
            withDividers={withDividers}
          />

          {rightContent && (
            <div className={classNames(styles.rightContent, styles.rightContentMobile)}>
              {rightContent}
            </div>
          )}

          <MuiDialogContent {...dialogContentProps}>{children}</MuiDialogContent>

          <Actions actions={actions} fullScreen={fullScreen} withDividers={withDividers} />
        </div>
      </div>
    </MuiDialog>
  );
}

export default Dialog;
