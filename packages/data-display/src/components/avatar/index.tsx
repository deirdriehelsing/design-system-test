import type { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

import * as styles from './index.css';
import MuiAvatar from '@mui/material/Avatar';
import React from 'react';
import Stack from '@blueshift-ui/core/dist/components/stack';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';
import getInitials from './helpers/get-initials';

interface AvatarProps extends MuiAvatarProps {
  backgroundVariant?: 'filled' | 'outlined';
  index?: number;
  size?: 'small' | 'large';
  subtitle?: string;
  title?: string;
  userName?: string | string[];
}

function Avatar({
  backgroundVariant = 'filled',
  children,
  className,
  index = 0,
  size = 'small',
  subtitle,
  title,
  src,
  userName,
  ...avatarProps
}: AvatarProps) {
  const backgroundIndex = index % Object.keys(styles.avatarBackground).length;
  const borderIndex = index % Object.keys(styles.avatarBorder).length;

  return (
    <Stack
      alignItems="center"
      className={styles.figure}
      component="figure"
      direction="row"
      justifyContent="flex-start"
      spacing={1}
    >
      <MuiAvatar
        {...avatarProps}
        className={classNames(styles.avatar[size], className, {
          [Object.values(styles.avatarBackground)[backgroundIndex]]:
            !src && backgroundVariant === 'filled',
          [Object.values(styles.avatarBorder)[borderIndex]]:
            !src && backgroundVariant === 'outlined',
          [styles.rounded]: avatarProps.variant === 'rounded',
        })}
        src={src}
      >
        {children ?? getInitials(userName)}
      </MuiAvatar>

      {title ? (
        <Typography component="figcaption" variant="caption">
          {title}
          {subtitle ? (
            <Typography className={styles.subtitle} component="span" variant="bodySmall">
              ({subtitle})
            </Typography>
          ) : null}
        </Typography>
      ) : null}
    </Stack>
  );
}

export default Avatar;
