import type {
  FilterMenuSingleSelectOptionsOnChange,
  FilterMenuSingleSelectOptionsValue,
  SelectOption,
} from '../../../../types';

import * as styles from './index.css';
import { Check as CheckIcon } from '@phosphor-icons/react';
import List from '@blueshift-ui/core/dist/components/list';
import Stack from '@blueshift-ui/core/dist/components/stack';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';

interface SingleSelectOptionsProps {
  label: string;
  onChange: FilterMenuSingleSelectOptionsOnChange;
  options: SelectOption[];
  value: FilterMenuSingleSelectOptionsValue;
}

function SingleSelectOptions({ label, onChange, options, value }: SingleSelectOptionsProps) {
  /* Hooks */

  const { isSmallViewport } = useBreakpoints();

  /* Event handlers */

  function handleChange(newValue: string) {
    if (newValue === value) {
      onChange(undefined);
      return;
    }

    onChange(newValue);
  }

  /* Render */

  return (
    <Stack className={styles.root} direction="column" spacing={0}>
      {isSmallViewport ? (
        <Typography className={styles.label} variant="bodyLargeProminent">
          {label}
        </Typography>
      ) : null}

      <List
        className={styles.list}
        items={options.map((option) => ({
          active: option.value === value,
          componentProps: {
            onClick: () => handleChange(option.value),
          },
          role: 'action',
          text: (
            <Stack direction="row" spacing={1}>
              {option.value === value ? <CheckIcon size={16} /> : null}
              <Typography variant="bodySmall">{option.label}</Typography>
            </Stack>
          ),
        }))}
      />
    </Stack>
  );
}

export default SingleSelectOptions;
