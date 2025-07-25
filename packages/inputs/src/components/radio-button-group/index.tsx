import type { ReactNode, Ref } from 'react';
import type { FormControlProps } from '@mui/material/FormControl';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { RadioInputOptionsProps } from '../../types';
import type { TypographyOwnProps } from '@mui/material/Typography/Typography';

import * as styles from './index.css';
import React, { forwardRef } from 'react';
import CarouselInputOptions from './components/carousel-input-options';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import RadioInputOptions from './components/radio-input-options';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';

interface RadioButtonGroupProps
  extends Omit<FormControlProps, 'onChange' | 'variant'>,
    Pick<RadioGroupProps, 'onChange' | 'name' | 'value'>,
    RadioInputOptionsProps {
  label?: ReactNode;
  labelId?: string;
  labelTypographyVariant?: TypographyOwnProps['variant'];
  labelVariant?: 'default' | 'inline';
  radioGroupProps?: RadioGroupProps;
  renderAsCarousel?: boolean;
}

function RadioButtonGroup(
  {
    className,
    defaultValue,
    inputOptions,
    label,
    labelId = 'radio-button-group-label',
    labelVariant = 'default',
    labelTypographyVariant = 'bodyLarge',
    name = 'radio-button-group',
    onChange,
    radioGroupProps,
    renderAsCarousel,
    value,
    variant = 'default',
    ...formControlProps
  }: RadioButtonGroupProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <FormControl
      {...formControlProps}
      className={classNames(className, { [styles.carousel]: renderAsCarousel })}
      ref={ref}
    >
      {label && labelVariant === 'default' ? (
        <Typography component="label" id={labelId} variant={labelTypographyVariant}>
          {label}
        </Typography>
      ) : null}

      <RadioGroup
        aria-labelledby={labelId}
        className={classNames({ [styles.cardsOptionsGroup]: variant === 'cards' })}
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
        row={['chips', 'cards'].includes(variant)}
        value={value}
        {...radioGroupProps}
      >
        {label && labelVariant === 'inline' ? <FormLabel id={labelId}>{label}</FormLabel> : null}

        {renderAsCarousel ? (
          <CarouselInputOptions inputOptions={inputOptions} variant={variant} />
        ) : (
          <RadioInputOptions inputOptions={inputOptions} variant={variant} />
        )}
      </RadioGroup>
    </FormControl>
  );
}

export default forwardRef(RadioButtonGroup);
