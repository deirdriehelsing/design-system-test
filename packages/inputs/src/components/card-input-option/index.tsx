import type { CardInputOptionProps } from '../../types';
import type { Ref } from 'react';

import * as styles from './index.css';
import { CheckCircle as CheckCircleIcon, Circle as CircleIcon } from '@phosphor-icons/react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import BaseCard from '@blueshift-ui/surfaces/dist/components/base-card';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import { Radio } from '@mui/material';
import Stack from '@blueshift-ui/core/dist/components/stack';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import clsx from 'clsx';

/**
 * Renders a Card next to an invisible Radio button so that the button can function like an input
 * control.
 */
function CardInputOption(
  {
    children,
    description,
    disabled,
    image,
    label,
    selected,
    value,
    ...buttonProps
  }: CardInputOptionProps,
  ref: Ref<HTMLInputElement | null>
) {
  const innerRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => innerRef.current);

  const hasImage = Boolean(image);

  const button = disabled ? null : (
    <IconButton
      aria-checked={selected}
      aria-label={label}
      className={clsx({
        [styles.iconButtonImage]: hasImage,
        [styles.iconButtonNoImage]: !hasImage,
      })}
      component="div"
    >
      {selected ? (
        <CheckCircleIcon size={30} weight="fill" />
      ) : (
        <CircleIcon size={30} weight="thin" />
      )}
    </IconButton>
  );

  return (
    <BaseCard
      actionAreaProps={{
        onClick: () => innerRef.current?.click(),
      }}
      className={clsx(styles.card, {
        [styles.cardDisabled]: disabled,
        [styles.cardSelected]: selected,
      })}
      variant="outlined"
      {...buttonProps}
    >
      <Radio className={styles.hiddenInput} disabled={disabled} inputRef={innerRef} value={value} />

      {hasImage ? button : null}

      {!hasImage ? null : typeof image === 'string' ? (
        <img alt={label} className={styles.image} src={image} />
      ) : (
        <div className={styles.image}>{image}</div>
      )}

      <Stack className={styles.textContent} spacing="0.5rem">
        <div className={styles.radioHeader}>
          {hasImage ? null : button}
          <Typography
            className={clsx(styles.label, {
              [styles.labelNoImage]: !hasImage,
            })}
          >
            {label}
          </Typography>
        </div>

        {description && <Typography variant="bodySmall">{description}</Typography>}
      </Stack>

      {children}
    </BaseCard>
  );
}

export type { CardInputOptionProps };

export default forwardRef(CardInputOption);
