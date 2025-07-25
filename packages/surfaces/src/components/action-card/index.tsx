import type { BaseCardProps } from '../../types';
import type { PaperProps } from '@blueshift-ui/core';
import type { ReactNode } from 'react';
import type { RichContent } from '@blueshift-ui/nsp/dist/types';

import * as styles from './index.css';
import ActionCardDescription from './components/action-card-description';
import ActionCardImage from './components/action-card-image';
import BaseCard from '../base-card';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';

interface ActionCardProps extends Partial<Pick<BaseCardProps, 'actionAreaProps' | 'className'>> {
  action: ReactNode;
  alt?: string;
  description?: RichContent | string;
  headline: string;
  image?: string | ReactNode;
  variant?:
    | 'accent01'
    | 'accent02'
    | 'accent03'
    | 'accent04'
    | 'accent05'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'tertiary'
    | 'warning'
    | 'neutral';
}

function ActionCard({
  actionAreaProps,
  action,
  alt = 'icon',
  className,
  headline,
  image,
  description,
  variant,
}: ActionCardProps) {
  const colorVariant = variant === 'neutral' ? 'bordered' : 'colored';

  return (
    <BaseCard
      accentColor={variant as PaperProps<'colored'>['accentColor']}
      actionAreaProps={actionAreaProps}
      actions={
        action && (
          <Typography component="div" variant="bodySmall">
            {action}
          </Typography>
        )
      }
      actionsProps={{ className: styles.actions }}
      className={classNames(styles.actionCardVariants[variant ?? 'default'], className)}
      colorVariant={colorVariant}
      contentProps={{ className: styles.content }}
    >
      <div className={styles.contentContainer}>
        <div className={styles.headlineContainer}>
          <div>
            <ActionCardImage alt={alt} image={image} />
          </div>
          <Typography className={styles.headline} component="h3" variant="titleMedium">
            {headline}
          </Typography>
        </div>
        {description && <ActionCardDescription description={description} />}
      </div>
    </BaseCard>
  );
}

export default ActionCard;
