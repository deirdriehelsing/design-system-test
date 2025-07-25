import type { BadgeProps } from '../../types';
import type { Ref } from 'react';

import MuiBadge from '@mui/material/Badge';
import classNames from 'clsx';
import { forwardRef } from 'react';

function Badge({ size, ...muiBadgeProps }: BadgeProps, ref: Ref<HTMLSpanElement>) {
  return (
    <MuiBadge
      {...muiBadgeProps}
      className={classNames(muiBadgeProps.className, {
        'BlueshiftBadge-sizeLarge': size === 'large',
      })}
      ref={ref}
    />
  );
}

export default forwardRef(Badge);
