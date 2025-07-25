import type { DatePickerProps as MuiXDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { PickerValidDate } from '@mui/x-date-pickers';

import * as styles from './index.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker as MuiXDatePicker } from '@mui/x-date-pickers/DatePicker';
import isDateDisabled from '../../helpers/is-date-disabled';

interface DatePickerProps<TDate extends PickerValidDate> extends MuiXDatePickerProps<TDate> {
  enabledDates?: TDate[];
  shouldDisableDate?: (date: TDate) => boolean;
}

function DatePicker<TDate extends PickerValidDate>(datePickerProps: DatePickerProps<TDate>) {
  const hasEnabledDates = Boolean(datePickerProps.enabledDates?.length);

  function shouldDisableDate(date: TDate) {
    return Boolean(
      isDateDisabled(date, datePickerProps.enabledDates) ||
        datePickerProps.shouldDisableDate?.(date)
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiXDatePicker
        {...datePickerProps}
        shouldDisableDate={shouldDisableDate}
        slotProps={{
          textField: {
            className: styles.textField,
          },
          ...datePickerProps.slotProps,
          ...(hasEnabledDates
            ? {
                day: {
                  className: styles.enabledDate,
                },
              }
            : {}),
        }}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;
