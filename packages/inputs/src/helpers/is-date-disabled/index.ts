import type { PickerValidDate } from '@mui/x-date-pickers';

import { isEqual, startOfDay } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const adapterDateFns = new AdapterDateFns();

function isDateDisabled<TDate extends PickerValidDate>(
  date: TDate,
  enabledDates: TDate[] | undefined
) {
  const hasEnabledDates = Boolean(enabledDates?.length);

  // disables any date that is not in the enabledDates array
  if (hasEnabledDates) {
    return !enabledDates?.some((enabledDate) => {
      const adapterDate = !date || typeof date === 'string' ? adapterDateFns.date(date) : date;
      const adapterEnabledDate =
        !enabledDate || typeof enabledDate === 'string'
          ? adapterDateFns.date(enabledDate)
          : enabledDate;

      return (
        adapterDate &&
        adapterEnabledDate &&
        isEqual(startOfDay(adapterDate), startOfDay(adapterEnabledDate))
      );
    });
  }

  return false;
}

export default isDateDisabled;
