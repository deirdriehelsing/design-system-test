import type { BaseCardProps } from '../../types';
import type { ReactNode } from 'react';
import type { RichContent } from '@blueshift-ui/nsp';

import * as styles from './index.css';
import BaseCard from '../base-card';
import Image from '@blueshift-ui/core/dist/components/image';
import Pitch from './components/pitch';
import React from 'react';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';
import clsx from 'clsx';

interface MerchandisingCardProps
  extends Partial<Pick<BaseCardProps, 'actionAreaProps' | 'className'>> {
  action: ReactNode;
  direction?: 'horizontal' | 'vertical';
  headline: ReactNode;
  image?: string;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  pitch?: RichContent | ReactNode;
  variant?: 'amethyst' | 'coral' | 'gold';
}

function MerchandisingCard({
  actionAreaProps,
  action,
  className,
  direction = 'horizontal',
  headline,
  imageProps,
  image,
  pitch,
  variant,
}: MerchandisingCardProps) {
  if (actionAreaProps) {
    actionAreaProps.className = classNames(
      styles.actionAreaDirection[direction],
      actionAreaProps?.className
    );
  }

  return (
    <BaseCard
      actionAreaProps={actionAreaProps}
      actions={
        <>
          {action && (
            <Typography component="div" variant="bodySmall">
              {action}
            </Typography>
          )}
        </>
      }
      actionsProps={{ className: styles.actions }}
      className={classNames(
        styles.merchandisingCardColorVariants[variant ?? 'default'],
        styles.merchandisingCardDirection[direction],
        className
      )}
      contentProps={{ className: styles.content }}
      media={
        image ? (
          <div className={styles.imageContainerDirection[direction]}>
            <Image
              alt=""
              height={176}
              src={image}
              width={400}
              {...imageProps}
              className={clsx(styles.image, imageProps?.className)}
            />
          </div>
        ) : null
      }
      mediaProps={{ className: styles.image }}
    >
      <Typography
        className={styles.headlineVariants[variant ?? 'default']}
        component="h3"
        variant="titleLarge"
      >
        {headline}
      </Typography>

      <Pitch content={pitch} variant={variant} />
    </BaseCard>
  );
}

export default MerchandisingCard;
