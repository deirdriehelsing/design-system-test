import type {
  FilterMenuMultiSelectOptionsOnChange,
  FilterMenuMultiSelectOptionsValue,
  SelectOption,
} from '../../../../types';
import type { ChangeEvent } from 'react';

import * as styles from './index.css';
import Button from '@blueshift-ui/core/dist/components/button';
import Checkbox from '../../../checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@blueshift-ui/core/dist/components/link';
import Stack from '@blueshift-ui/core/dist/components/stack';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

interface MultiSelectOptionsProps {
  columnCount?: number;
  label: string;
  onApply: () => void;
  onChange: FilterMenuMultiSelectOptionsOnChange;
  options: SelectOption[];
  value: FilterMenuMultiSelectOptionsValue;
}

function MultiSelectOptions({
  columnCount = 2,
  label,
  onApply,
  onChange,
  options,
  value,
}: MultiSelectOptionsProps) {
  /* Hooks */

  const { isSmallViewport } = useBreakpoints();
  const { translate } = useTranslation('inputs', { ns: 'blueshift-ui' });

  /* Event handlers */

  function handleChange(event: ChangeEvent<HTMLInputElement>, checked: boolean) {
    const value = event.target.value;

    onChange((prevState = []) =>
      checked ? [...prevState, value] : prevState.filter((id) => id !== value)
    );
  }

  function handleClear() {
    onChange([]);
  }

  /* Render */

  return (
    <Stack className={styles.root} spacing={0}>
      {isSmallViewport ? (
        <Typography className={styles.label} variant="bodyLargeProminent">
          {label}
        </Typography>
      ) : null}

      <div style={isSmallViewport ? {} : { columns: columnCount }}>
        {options?.map((option) => (
          <FormControlLabel
            className={styles.formControlLabel}
            control={
              <Checkbox
                checked={Boolean(value?.includes(option.value))}
                color="secondary"
                disabled={option.disabled}
                key={`sessionTypes-${option.value}`}
                onChange={handleChange}
                value={option.value}
              />
            }
            key={option.id ?? option.value}
            label={<Typography variant="bodySmall">{option.label}</Typography>}
          />
        ))}
      </div>

      <Stack className={styles.actions} direction={isSmallViewport ? 'column' : 'row'} spacing={2}>
        <Button color="secondary" onClick={onApply} size={isSmallViewport ? 'medium' : 'small'}>
          {translate('filter_menu_button_apply')}
        </Button>

        {isSmallViewport ? (
          <Button color="secondary" onClick={handleClear} size="medium" variant="outlined">
            {translate('filter_menu_button_clear')}
          </Button>
        ) : (
          <Link onClick={handleClear} variant="bodySmall">
            {translate('filter_menu_button_clear')}
          </Link>
        )}
      </Stack>
    </Stack>
  );
}

export default MultiSelectOptions;
