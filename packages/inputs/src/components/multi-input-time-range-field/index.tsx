import type { MultiInputTimeRangeFieldProps as MuiXMultiInputTimeRangeFieldProps } from '@mui/x-date-pickers-pro';

import {
  LocalizationProvider,
  MultiInputTimeRangeField as MuiXMultiInputTimeRangeField,
} from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFnsV3';
import { LicenseInfo } from '@mui/x-license';
import { MuiXLicenseKey } from '@blueshift-ui/core/dist/constants';

LicenseInfo.setLicenseKey(MuiXLicenseKey);

interface MultiInputTimeRangeFieldProps extends MuiXMultiInputTimeRangeFieldProps<Date> {
  endTimeInputLabel?: string;
  startTimeInputLabel?: string;
}

function MultiInputTimeRangeField(props: MultiInputTimeRangeFieldProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiXMultiInputTimeRangeField
        {...props}
        slotProps={{
          textField: ({ position }) => ({
            label: position === 'start' ? props.startTimeInputLabel : props.endTimeInputLabel,
          }),
          ...(props.slotProps ?? {}),
        }}
      />
    </LocalizationProvider>
  );
}

export default MultiInputTimeRangeField;
