import type { BaseCardProps } from '../../types';
import type { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';
import type { ReactElement } from 'react';

import * as styles from './index.css';
import React, { cloneElement, isValidElement } from 'react';
import BaseCard from '../base-card';
import Image from '@blueshift-ui/core/dist/components/image';
import LinearProgress from '@blueshift-ui/core/dist/components/linear-progress';
import MediaCardAction from '../media-card-action';
import Skeleton from '@blueshift-ui/core/dist/components/skeleton';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';
import formatTitle from './helpers/formatTitle';

interface MediaCardProps extends Partial<Pick<BaseCardProps, 'actionAreaProps' | 'className'>> {
  action?: React.ReactNode;
  actionDetails?: React.ReactNode;
  color?: 'accent01' | 'accent02' | 'accent03' | 'accent04' | 'empty';
  description?: React.ReactNode;
  loading?: boolean;
  maxTitleLength?: number;
  overline?: React.ReactNode;
  progressBarValue?: number;
  thumbnail?: string;
  title?: React.ReactNode;
}

const colorMap = {
  accent01: 'accent01',
  accent02: 'accent02',
  accent03: 'accent03',
  accent04: 'accent04',
  empty: 'primary',
};

function MediaCard({
  action,
  actionDetails,
  color = 'accent01',
  description,
  loading = false,
  maxTitleLength,
  overline,
  progressBarValue,
  thumbnail,
  title,
  ...cardProps
}: MediaCardProps) {
  if (loading) {
    return (
      <BaseCard
        actions={
          <>
            <Skeleton
              className={styles.actionDetailSkeleton}
              component="div"
              variant="rectangular"
            />
            <Skeleton className={styles.actionSkeleton} component="div" variant="rectangular" />
          </>
        }
        className={styles.mediaCardVariants.empty}
        contentProps={{ className: styles.content }}
        media={<Skeleton className={styles.thumbnail} variant="rectangular" />}
      >
        <Skeleton className={styles.titleSkeleton} variant="rectangular" />
        <Skeleton className={styles.descriptionSkeleton} variant="rectangular" />
      </BaseCard>
    );
  }

  const mediaCardAction =
    action && isValidElement(action) && action?.type === MediaCardAction
      ? cloneElement(action as ReactElement<{ color: string }>, { color: colorMap[color] })
      : null;

  return (
    <BaseCard
      {...cardProps}
      actions={
        <>
          {!(progressBarValue || progressBarValue === 0) ? null : (
            <LinearProgress
              color={colorMap[color] as MuiLinearProgressProps['color']}
              value={progressBarValue}
              variant="determinate"
            />
          )}

          {!actionDetails ? null : (
            <Typography component="p" variant="bodySmall">
              {actionDetails}
            </Typography>
          )}

          {!action
            ? null
            : (mediaCardAction ?? (
                <Typography className={styles.action} component="p" variant="bodySmall">
                  {action}
                </Typography>
              ))}
        </>
      }
      className={classNames(styles.mediaCardVariants[color], cardProps.className)}
      contentProps={{ className: styles.content }}
      media={thumbnail}
      mediaProps={{
        alt: '',
        className: styles.thumbnail,
        component: Image,
        height: 160,
        width: 312,
      }}
    >
      {overline && (
        <Typography className={styles.tagVariants[color]} variant="labelSmall">
          {overline}
        </Typography>
      )}

      <Typography className={styles.title} component="h3" variant="labelLarge">
        {formatTitle(title, maxTitleLength)}
      </Typography>

      {description && (
        <Typography className={styles.description} component="p" variant="bodySmall">
          {description}
        </Typography>
      )}
    </BaseCard>
  );
}

export default MediaCard;
