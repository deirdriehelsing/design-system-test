import type { DateCalendarProps as MuiXDateCalendarProps } from '@mui/x-date-pickers/DateCalendar';
import type { PickerValidDate } from '@mui/x-date-pickers';

import * as styles from './index.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateCalendar as MuiXDateCalendar } from '@mui/x-date-pickers/DateCalendar';
import isDateDisabled from '../../helpers/is-date-disabled';

interface DateCalendarProps<TDate extends PickerValidDate> extends MuiXDateCalendarProps<TDate> {
  enabledDates?: TDate[];
  shouldDisableDate?: (date: TDate) => boolean;
}

function DateCalendar<TDate extends PickerValidDate>(dateCalendarProps: DateCalendarProps<TDate>) {
  const hasEnabledDates = Boolean(dateCalendarProps.enabledDates?.length);

  function shouldDisableDate(date: TDate) {
    return Boolean(
      isDateDisabled(date, dateCalendarProps.enabledDates) ||
        dateCalendarProps.shouldDisableDate?.(date)
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiXDateCalendar
        {...dateCalendarProps}
        shouldDisableDate={shouldDisableDate}
        slotProps={{
          ...dateCalendarProps.slotProps,
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

export default DateCalendar;
