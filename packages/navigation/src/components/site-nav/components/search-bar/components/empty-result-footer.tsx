import type RichTranslation from '@blueshift-ui/i18n/dist/components/rich-translation';

import * as styles from '../index.css';
import React from 'react';
import Typography from '@blueshift-ui/theme/dist/components/typography';

interface EmptyResultFooterProps {
  message: ReturnType<typeof RichTranslation>;
  title: string;
}

function EmptyResultFooter({ title, message }: EmptyResultFooterProps) {
  return (
    <div className={styles.noResultCta}>
      <Typography className={styles.resultTitle} component="h3">
        {title}
      </Typography>
      <Typography className={styles.resultLabel} component="div">
        {message}
      </Typography>
    </div>
  );
}

export default EmptyResultFooter;
