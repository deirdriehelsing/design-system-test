import type { ComponentOverride, Tokens } from '../../../types';

import datePickerOverrides from './date-picker';

function dateRangePickerOverrides(tokens: Tokens): ComponentOverride<'MuiDateRangeCalendar'> {
  return {
    MuiDateRangeCalendar: {
      styleOverrides: {
        root: {
          ...(datePickerOverrides(tokens)?.MuiDateCalendar?.styleOverrides?.root as object),
          '.MuiPickersDay-root': {
            color: tokens.sys.color.text.default,
          },
          '.MuiDateRangePickerDay-day.Mui-selected:hover': {
            backgroundColor: tokens.sys.color.secondary.main,
          },
          '.MuiDateRangePickerDay-rangeIntervalDayHighlight:not(.MuiDateRangePickerDay-hiddenDayFiller)':
            {
              backgroundColor: tokens.sys.color.secondary.light,
            },
        },
      },
    },
  };
}

export default dateRangePickerOverrides;
