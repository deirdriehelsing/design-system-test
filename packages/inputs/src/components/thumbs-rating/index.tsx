import type { ThumbsRatingProps } from '../../types/thumbs-rating-props';
import type { ThumbsRatingValue } from '../../types/thumbs-rating-value';
import type { ThumbsRatingVariant } from '../../types/thumbs-rating-variant';

import * as styles from './index.css';
import Box from '@blueshift-ui/core/dist/components/box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import ThumbButton from './components/thumb-button';
import Tooltip from '@blueshift-ui/core/dist/components/tooltip';

function ThumbsRating({
  defaultValue,
  disabled,
  downTooltipProps,
  helperText,
  id,
  label,
  labelId,
  onChange,
  upTooltipProps,
  value: givenValue,
  ...formControlProps
}: ThumbsRatingProps) {
  const [internalValue, setInternalValue] = React.useState<ThumbsRatingValue>(
    givenValue ?? defaultValue ?? null
  );

  const value = givenValue ?? internalValue ?? defaultValue ?? null;

  function handleClick(variant: ThumbsRatingVariant) {
    const newValue = value === variant ? null : (variant as ThumbsRatingValue);

    onChange?.(newValue);

    setInternalValue(newValue);
  }

  return (
    <FormControl disabled={disabled} role="group" {...formControlProps}>
      {label && (
        <FormLabel className={styles.label} htmlFor={id} id={labelId}>
          {label}
        </FormLabel>
      )}
      <Box className={styles.wrapper}>
        <Tooltip describeChild title={upTooltipProps?.title} {...upTooltipProps}>
          <ThumbButton
            disabled={disabled}
            error={formControlProps.error}
            onClick={handleClick}
            value={value}
            variant="up"
          />
        </Tooltip>
        <Tooltip describeChild title={downTooltipProps?.title} {...downTooltipProps}>
          <ThumbButton
            disabled={disabled}
            error={formControlProps.error}
            onClick={handleClick}
            value={value}
            variant="down"
          />
        </Tooltip>
      </Box>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
}

export default ThumbsRating;
