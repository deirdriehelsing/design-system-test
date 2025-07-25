import type { ButtonProps } from '@blueshift-ui/core';
import type { ElementType } from 'react';

import * as styles from './index.css';
import Button from '@blueshift-ui/core/dist/components/button';
import classNames from 'clsx';

// See: https://mui.com/material-ui/guides/composition/#with-typescript
type MediaCardActionProps<RootComponent extends ElementType> = Omit<
  ButtonProps<RootComponent, { component?: RootComponent }>,
  'color' | 'size' | 'variant'
> & {
  color?: 'accent01' | 'accent02' | 'accent03' | 'accent04' | 'primary';
};

function MediaCardAction<RootComponent extends ElementType>({
  children,
  className,
  color = 'accent01',
  ...buttonProps
}: MediaCardActionProps<RootComponent>) {
  return (
    <Button
      {...buttonProps}
      className={classNames(styles.button, className)}
      color={color as ButtonProps['color']}
      size="small"
      variant="contained"
    >
      {children}
    </Button>
  );
}

export default MediaCardAction;
