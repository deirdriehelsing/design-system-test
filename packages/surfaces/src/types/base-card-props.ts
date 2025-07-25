import type { CardActionAreaProps as MuiCardActionAreaProps } from '@mui/material/CardActionArea';
import type { CardActionsProps as MuiCardActionsProps } from '@mui/material/CardActions';
import type { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';
import type { CardMediaProps as MuiCardMediaProps } from '@mui/material/CardMedia';
import type { CardProps as MuiCardProps } from '@mui/material/Card';
import type { ReactNode } from 'react';

interface MediaProps extends Omit<MuiCardMediaProps, 'image' | 'src'> {
  alt?: string;
  height?: number;
  width?: number;
}

interface BaseCardProps extends MuiCardProps {
  /**
   * The props applied to the MUI CardActionArea element.
   * @see https://mui.com/material-ui/api/card-action-area/#props
   */
  actionAreaProps?: MuiCardActionAreaProps;
  /**
   * The action(s) rendered after the primary content.
   */
  actions?: React.ReactNode;
  /**
   * The props applied to the MUI CardActions element.
   * @see https://mui.com/material-ui/api/card-actions/#props
   */
  actionsProps?: MuiCardActionsProps;
  /**
   * The props applied to the MUI CardContent element.
   * @see https://mui.com/material-ui/api/card-content/#props
   */
  contentProps?: MuiCardContentProps;
  /**
   * Path to the card media. Alias for `mediaProps.image`. If media is a ReactNode, it will override
   * the `CardMedia` component and any `mediaProps` will be ignored.
   * @see https://mui.com/material-ui/api/card-media/#CardMedia-prop-image
   */
  media?: ReactNode;
  /**
   * The props applied to the MUI CardMedia element. The `image` and `src` props are omitted in
   * favor of the `media` prop.
   * @see https://mui.com/material-ui/api/card-action-area/#props
   */
  mediaProps?: MediaProps;
}

export type { BaseCardProps };
