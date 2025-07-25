import type { DialogActionsProps } from '@mui/material/DialogActions';

import Divider from '@blueshift-ui/core/dist/components/divider';
import MuiDialogActions from '@mui/material/DialogActions';

type ActionsProps = {
  actions: React.ReactNode;
  dialogActionsProps?: DialogActionsProps;
  fullScreen?: boolean;
  withDividers?: boolean;
};

function Actions({ actions, dialogActionsProps, fullScreen, withDividers }: ActionsProps) {
  return (
    <>
      {(withDividers || fullScreen) && actions ? <Divider /> : null}

      {actions ? <MuiDialogActions {...dialogActionsProps}>{actions}</MuiDialogActions> : null}
    </>
  );
}

export default Actions;
