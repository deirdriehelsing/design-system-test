import type { RatingProps } from '../../types';
import type { Ref } from 'react';

import * as styles from './index.css';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MuiRating from '@mui/material/Rating';
import { Star } from '@phosphor-icons/react';
import classNames from 'clsx';
import { forwardRef } from 'react';

function Rating(
  {
    className,
    color = 'default',
    disabled,
    /**
     * @deprecated This default value (`true`) will be removed (and thus turned to `false` by the
     * underlying component) in the next major version.
     */
    fullWidth = true,
    helperText,
    id,
    label,
    labelId,
    value,
    defaultValue = value === undefined ? 0 : undefined, // Makes sure it doesn't switch between controlled and uncontrolled
    onChange,
    readOnly = false,
    size = 'medium',
    ...formControlProps
  }: RatingProps,
  ref: Ref<HTMLSpanElement>
) {
  const commonRatingProps = {
    color,
    defaultValue,
    disabled,
    id,
    label,
    onChange,
    size,
    readOnly,
    value,
  };

  return (
    <FormControl
      {...formControlProps}
      className={classNames(styles.label, className)}
      disabled={disabled}
      // TODO: Remove this fullWidth prop in the next major version and leave it for the spread above {...formControlProps}.
      fullWidth={fullWidth}
    >
      {label && (
        <FormLabel htmlFor={id} id={labelId} sx={{ marginBottom: '0.5rem' }}>
          {label}
        </FormLabel>
      )}

      <MuiRating
        {...commonRatingProps}
        aria-labelledby={labelId}
        disabled={disabled}
        emptyIcon={<Star role="img" weight="regular" />}
        icon={<Star role="img" weight="fill" />}
        ref={ref}
        sx={styles}
      />
    </FormControl>
  );
}

export default forwardRef<HTMLSpanElement, RatingProps>(Rating);
