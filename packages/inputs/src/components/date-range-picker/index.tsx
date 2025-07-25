import type { DateRangePickerProps as MuiXDateRangePickerProps } from '@mui/x-date-pickers-pro/DateRangePicker';

import {
  LocalizationProvider,
  MultiInputDateRangeField,
  SingleInputDateRangeField,
} from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFnsV3';
import { LicenseInfo } from '@mui/x-license';
import { DateRangePicker as MuiXDateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { MuiXLicenseKey } from '@blueshift-ui/core/dist/constants';

LicenseInfo.setLicenseKey(MuiXLicenseKey);

interface DateRangePickerProps extends MuiXDateRangePickerProps<Date> {
  useSingleInput?: boolean;
}

function DateRangePicker(dateRangePickerProps: DateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiXDateRangePicker
        {...dateRangePickerProps}
        slots={{
          field: dateRangePickerProps.useSingleInput
            ? SingleInputDateRangeField
            : MultiInputDateRangeField,
          ...(dateRangePickerProps.slots ?? {}),
        }}
      />
    </LocalizationProvider>
  );
}

export default DateRangePicker;
