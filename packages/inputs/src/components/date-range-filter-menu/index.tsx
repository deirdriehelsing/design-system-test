import type { DateRangePickerProps as MuiDateRangePickerProps } from '@mui/x-date-pickers-pro/DateRangePicker';

import DateRangeChipField from './components/date-range-chip-field';
import DateRangePicker from '../date-range-picker';
import useControlledState from '@blueshift-ui/core/dist/hooks/use-controlled-state';
import { useState } from 'react';

interface DateRangeFilterMenuProps extends MuiDateRangePickerProps<Date> {}

function DateRangeFilterMenu(props: DateRangeFilterMenuProps) {
  const [controlledValue, setControlledValue] = useControlledState(props?.value);
  const [open, setOpen] = useState(false);

  const fieldProps = {
    ...props.slotProps?.field,
    hasValue: Boolean(controlledValue?.[0]),
    isOpen: open,
    value: controlledValue,
  };

  function handleClose() {
    setOpen(false);
    props.onClose?.();
  }

  const handleOnAccept: DateRangeFilterMenuProps['onAccept'] = (newValue, context) => {
    setControlledValue(newValue);
    setOpen(false);
    props.onAccept?.(newValue, context);
  };

  function handleOpen() {
    setOpen(true);
    props.onOpen?.();
  }

  return (
    <DateRangePicker
      label={props.label}
      slotProps={{
        ...props.slotProps,
        field: { ...fieldProps },
      }}
      slots={{ field: DateRangeChipField, ...props.slots }}
      {...props}
      onAccept={handleOnAccept}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      value={controlledValue || [null, null]}
    />
  );
}

export default DateRangeFilterMenu;
