import type { BaseCardProps } from '../../types';

import React, { Fragment } from 'react';
import MuiCard from '@mui/material/Card';
import MuiCardActionArea from '@mui/material/CardActionArea';
import MuiCardActions from '@mui/material/CardActions';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardMedia from '@mui/material/CardMedia';
import Paper from '@blueshift-ui/core/dist/components/paper';

const DEFAULT_SUPPLEMENTAL_ACTIONS_PROPS = {
  disableSpacing: true,
};

/**
 * Base Card implementation. Not intended to be used directly.
 * @see https://mui.com/material-ui/react-card/
 * */
function BaseCard({
  actionAreaProps,
  actions,
  actionsProps = DEFAULT_SUPPLEMENTAL_ACTIONS_PROPS,
  children,
  contentProps,
  media,
  mediaProps,
  ...cardProps
}: BaseCardProps) {
  if (!children) {
    return null;
  }

  // If action area props are provided, we'll wrap the card content in a CardActionArea
  const PrimaryAction = actionAreaProps ? MuiCardActionArea : Fragment;

  return (
    <MuiCard colorVariant="bordered" component={Paper} {...cardProps}>
      <PrimaryAction {...actionAreaProps}>
        {typeof media === 'string' ? (
          <MuiCardMedia {...mediaProps} image={media} />
        ) : (
          (media ?? null)
        )}

        <MuiCardContent {...contentProps}>{children}</MuiCardContent>
      </PrimaryAction>

      {actions && <MuiCardActions {...actionsProps}>{actions}</MuiCardActions>}
    </MuiCard>
  );
}

export default BaseCard;
