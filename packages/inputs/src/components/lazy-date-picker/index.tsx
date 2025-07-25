import type {
  DatePickerSlotProps,
  DatePickerSlots,
  DatePickerProps as MuiXDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import type { Locale } from 'date-fns';
import type { LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
import type { PickerValidDate } from '@mui/x-date-pickers';

import * as styles from './index.css';
import React, { Suspense, lazy, useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@blueshift-ui/core/dist/components/skeleton';
import TextField from '../text-field';
import { format } from 'date-fns';
import isDateDisabled from '../../helpers/is-date-disabled';

const LazyMuiXDatePicker = lazy(() =>
  import('@mui/x-date-pickers/DatePicker').then((module) => ({ default: module.DatePicker }))
);

const LazyLocalizationProviderWithAdapter = lazy(() =>
  Promise.all([import('@mui/x-date-pickers'), import('@mui/x-date-pickers/AdapterDateFnsV3')]).then(
    ([localizationModule, adapterModule]) => ({
      default: (props: Omit<LocalizationProviderProps<Date, Locale>, 'dateAdapter'>) => {
        const LocalizationProvider = localizationModule.LocalizationProvider;
        const AdapterDateFns = adapterModule.AdapterDateFns;
        return <LocalizationProvider dateAdapter={AdapterDateFns} {...props} />;
      },
    })
  )
);

export interface LazyDatePickerProps<TDate extends PickerValidDate = Date>
  extends Omit<MuiXDatePickerProps<TDate>, 'open'> {
  enabledDates?: TDate[];
  fallbackTextFieldClassName?: string;
  shouldDisableDate?: (date: TDate) => boolean;
  slotProps?: DatePickerSlotProps<TDate, false> & {
    skeleton?: React.ComponentProps<typeof Skeleton>;
  };
  slots?: DatePickerSlots<TDate> & {
    skeleton?: React.ElementType;
  };
}

export default function LazyDatePicker({
  fallbackTextFieldClassName,
  value: initialValue,
  onChange,
  slots,
  slotProps,
  ...rest
}: LazyDatePickerProps) {
  const [pickerLoaded, setPickerLoaded] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState<Date | null>(initialValue ?? null);

  const hasEnabledDates = Boolean(rest.enabledDates?.length);
  const computedShouldDisableDate = (date: Date) =>
    Boolean(isDateDisabled(date, rest.enabledDates) || rest.shouldDisableDate?.(date));

  const handleLoadPicker = () => {
    if (!pickerLoaded) {
      setPickerLoaded(true);
    }
  };

  const handleLoadPickerAndOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleLoadPicker();
    setOpenPicker(true);
  };

  const handleClose = () => setOpenPicker(false);

  const handleOpen = () => setOpenPicker(true);

  const handleChange = (newValue: Date | null, context: any) => {
    setValue(newValue);
    if (newValue !== null && onChange) {
      onChange(newValue, context);
    }
  };

  // Return focus to the MUI Datepicker TextField after it has been lazy loaded.
  const setTextFieldInputRef = (node: HTMLInputElement | null) => {
    if (node) {
      node.focus();
      // We use a short delayto wait for MUI's internal focus handling to complete.
      // Without this delay, our override of the selection range might be applied too early and be overridden
      // by MUI's default behavior.
      setTimeout(() => {
        if (node.value === 'MM/DD/YYYY') {
          node.setSelectionRange(0, 2);
        }
      }, 50);
    }
  };

  // Interacting with the TextField triggers lazy loading.
  // Clicking on the calendar icon triggers lazy loading and opens the calendar.
  if (!pickerLoaded) {
    return (
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Choose date"
                edge="end"
                onClick={handleLoadPickerAndOpen}
                sx={{ pointerEvents: 'auto' }}
              >
                <EventIcon />
              </IconButton>
            </InputAdornment>
          ),
          className: fallbackTextFieldClassName,
        }}
        onClick={handleLoadPicker}
        onFocus={handleLoadPicker}
        placeholder="MM/DD/YYYY"
        value={value ? format(value, 'MM/dd/yyyy') : ''}
      />
    );
  }

  const SkeletonComponent = slots?.skeleton || Skeleton;
  const skeletonProps = {
    variant: 'rectangular' as const,
    width: 214,
    height: 49,
    ...slotProps?.skeleton,
  };

  const suspenseFallback = <SkeletonComponent {...skeletonProps} />;

  const textFieldProps = {
    className: styles.textField,
    inputRef: setTextFieldInputRef,
  };

  const dayProps = hasEnabledDates ? { className: styles.enabledDate } : undefined;

  const mergedSlotProps = {
    ...slotProps,
    textField: textFieldProps,
    ...(dayProps ? { day: dayProps } : {}),
  } as DatePickerSlotProps<Date, boolean>;

  return (
    <Suspense fallback={suspenseFallback}>
      <LazyLocalizationProviderWithAdapter>
        <LazyMuiXDatePicker
          {...rest}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          open={openPicker}
          shouldDisableDate={computedShouldDisableDate}
          slotProps={mergedSlotProps}
          value={value}
        />
      </LazyLocalizationProviderWithAdapter>
    </Suspense>
  );
}
