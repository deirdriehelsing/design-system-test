import type { BlobButtonProps } from '../../types';
import type { Ref } from 'react';

import * as styles from './index.css';
import React, { forwardRef } from 'react';
import Box from '@blueshift-ui/core/dist/components/box';
import Button from '@blueshift-ui/core/dist/components/button';
import classNames from 'clsx';
import useBlobBorderRadius from '@blueshift-ui/core/dist/hooks/use-blob-border-radius';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    blob: true;
  }
}

function BlobButton(
  { children, className, icon, orientation = 'horizontal', ...buttonProps }: BlobButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const blobBorderRadius = useBlobBorderRadius({ range: [30, 40] });

  return (
    <Button
      {...buttonProps}
      className={classNames(styles.button, className)}
      data-orientation={orientation}
      ref={ref}
      startIcon={
        <Box className="blob" sx={{ borderRadius: blobBorderRadius }}>
          {icon}
        </Box>
      }
      variant="blob"
    >
      {children}
    </Button>
  );
}

export default forwardRef<HTMLButtonElement, BlobButtonProps>(BlobButton);
