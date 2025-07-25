import type { PickerValidDate } from '@mui/x-date-pickers-pro';
import type { SingleInputDateRangeFieldProps } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

import {
  CaretDown as CaretDownIcon,
  CaretUp as CaretUpIcon,
  Check as CheckIcon,
} from '@phosphor-icons/react';
import Chip from '@blueshift-ui/core/dist/components/chip';
import Stack from '@blueshift-ui/core/dist/components/stack';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import { forwardRef } from 'react';
import useForkRef from '@mui/utils/useForkRef';

interface DateRangeChipFieldProps<TDate extends PickerValidDate>
  extends SingleInputDateRangeFieldProps<TDate> {
  hasValue?: boolean;
  isOpen?: boolean;
}

type DateRangeChipFieldComponent<TDate extends PickerValidDate> = ((
  props: DateRangeChipFieldProps<TDate> & React.RefAttributes<HTMLDivElement>
) => React.JSX.Element) & { fieldType?: string };

const DateRangeChipField = forwardRef(
  (props: DateRangeChipFieldProps<PickerValidDate>, ref: React.Ref<HTMLElement>) => {
    const {
      hasValue,
      isOpen,
      onClick,
      InputProps: { ref: containerRef } = {},
      inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    const handleRef = useForkRef(ref, containerRef);

    return (
      <Chip
        aria-label={ariaLabel}
        clickable={true}
        label={
          <Stack direction="row" spacing={0.5}>
            {hasValue ? <CheckIcon size={16} /> : null}
            <Stack direction="row" spacing={1}>
              <Typography variant="labelSmall">{props.label}</Typography>
              {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
            </Stack>
          </Stack>
        }
        onClick={onClick}
        ref={handleRef}
        size="small"
        variant={isOpen || hasValue ? 'filled' : 'outlined'}
      />
    );
  }
) as DateRangeChipFieldComponent<PickerValidDate>;

DateRangeChipField.fieldType = 'single-input';

export default DateRangeChipField;
