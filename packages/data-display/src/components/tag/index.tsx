import type { PropsWithChildren, ReactNode } from 'react';

import * as styles from './index.css';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';

interface TagProps {
  className?: string;
  color?: keyof typeof styles.tag;
  icon?: ReactNode;
}

function Tag({ children, className, color = 'primary', icon }: PropsWithChildren<TagProps>) {
  return (
    <span className={classNames('BlueshiftTag-root', styles.tag?.[color], className)}>
      {icon}
      <Typography variant="labelSmall">{children}</Typography>
    </span>
  );
}

export default Tag;
