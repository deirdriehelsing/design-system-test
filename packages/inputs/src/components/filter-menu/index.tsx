import type {
  FilterMenuMultiSelectOptionsOnChange,
  FilterMenuMultiSelectOptionsValue,
  FilterMenuSingleSelectOptionsOnChange,
  FilterMenuSingleSelectOptionsValue,
  SelectOption,
} from '../../types';
import type { MouseEvent, SetStateAction } from 'react';
import type { ChipProps } from '@blueshift-ui/core/dist/types';

import * as styles from './index.css';
import {
  CaretDown as CaretDownIcon,
  CaretUp as CaretUpIcon,
  Check as CheckIcon,
} from '@phosphor-icons/react';
import Chip from '@blueshift-ui/core/dist/components/chip';
import Drawer from '@blueshift-ui/core/dist/components/drawer';
import MultiSelectOptions from './components/multi-select-options';
import Popover from '@blueshift-ui/core/dist/components/popover';
import SingleSelectOptions from './components/single-select-options';
import Stack from '@blueshift-ui/core/dist/components/stack';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';
import useControlledState from '@blueshift-ui/core/dist/hooks/use-controlled-state';
import { useState } from 'react';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

interface FilterMenuProps<Multiple extends boolean | undefined = false>
  extends Omit<ChipProps, 'onChange' | 'onDelete'> {
  columnCount?: Multiple extends true ? number : never;
  label: string;
  multiple?: Multiple;
  onChange?: (
    value?: Multiple extends true
      ? FilterMenuMultiSelectOptionsValue
      : FilterMenuSingleSelectOptionsValue
  ) => void;
  onClose?: () => void;
  onOpen?: () => void;
  options: SelectOption[];
  value?: Multiple extends true
    ? FilterMenuMultiSelectOptionsValue
    : FilterMenuSingleSelectOptionsValue;
}

function FilterMenu<Multiple extends boolean | undefined = false>({
  className,
  label,
  multiple = false,
  columnCount,
  onChange,
  onClose,
  onOpen,
  options,
  size = 'small',
  value: propValue,
  ...chipProps
}: FilterMenuProps<Multiple>) {
  /* Hooks */

  const { translate } = useTranslation('inputs', { ns: 'blueshift-ui' });

  const [controlledValue, setControlledValue] = useControlledState(
    propValue as Multiple extends true
      ? FilterMenuMultiSelectOptionsValue
      : FilterMenuSingleSelectOptionsValue
  );

  const [filterValue, setFilterValue] = useState(controlledValue);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const { isSmallViewport } = useBreakpoints();

  /* Event handlers */

  function handleClose() {
    onClose?.();
    setAnchorEl(null);
  }

  function handleMultiApply() {
    setControlledValue(filterValue);
    onChange?.(filterValue);
    handleClose();
  }

  function handleMultiChange(
    value: SetStateAction<
      Multiple extends true ? FilterMenuMultiSelectOptionsValue : FilterMenuSingleSelectOptionsValue
    >
  ) {
    setFilterValue(value);
  }

  function handleOpen(event: MouseEvent<HTMLDivElement>) {
    setFilterValue(controlledValue);
    onOpen?.();
    setAnchorEl(event.currentTarget);
  }

  function handleSingleChange(
    value: Multiple extends true
      ? FilterMenuMultiSelectOptionsValue
      : FilterMenuSingleSelectOptionsValue
  ) {
    setFilterValue(value);
    setControlledValue(value);
    onChange?.(value);
    handleClose();
  }

  /* Render */

  const isOpen = Boolean(anchorEl);

  const isSelected = Boolean(controlledValue?.length);

  const filtersContent = multiple ? (
    <MultiSelectOptions
      columnCount={columnCount}
      label={label}
      onApply={handleMultiApply}
      onChange={handleMultiChange as FilterMenuMultiSelectOptionsOnChange}
      options={options}
      value={filterValue as FilterMenuMultiSelectOptionsValue}
    />
  ) : (
    <SingleSelectOptions
      label={label}
      onChange={handleSingleChange as FilterMenuSingleSelectOptionsOnChange}
      options={options}
      value={filterValue as FilterMenuSingleSelectOptionsValue}
    />
  );

  return (
    <>
      <Chip
        className={classNames(styles.button, className)}
        label={
          <Stack direction="row" spacing={0.5}>
            {isSelected ? <CheckIcon size={16} /> : null}
            <Stack direction="row" spacing={1}>
              <Typography variant="labelSmall">
                {multiple ? (
                  <>
                    {label} {isSelected ? `(${controlledValue?.length})` : ''}
                  </>
                ) : (
                  <>{options.find((option) => option.value === controlledValue)?.label ?? label}</>
                )}
              </Typography>
              {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
            </Stack>
          </Stack>
        }
        onClick={handleOpen}
        size={size}
        variant={isOpen || controlledValue?.length ? 'filled' : 'outlined'}
        {...chipProps}
      />

      {isSmallViewport ? (
        <Drawer
          anchor="bottom"
          ariaLabel={translate('search_filter_context_menu_aria_label')}
          isOpen={isOpen}
          onClose={handleClose}
          PaperProps={{ className: styles.drawer }}
          variant="temporary"
        >
          {filtersContent}
        </Drawer>
      ) : (
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          onClose={handleClose}
          open={isOpen}
        >
          {filtersContent}
        </Popover>
      )}
    </>
  );
}

export default FilterMenu;
