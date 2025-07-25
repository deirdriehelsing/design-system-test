import type { MouseEvent, ReactNode } from 'react';
import type { ColorName } from '@blueshift-ui/core/dist/types/color-name';

import * as styles from './index.css';
import Box from '@blueshift-ui/core/dist/components/box';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import { Pen as PenIcon } from '@phosphor-icons/react';
import Stack from '@blueshift-ui/core/dist/components/stack';
import mapColorNameToMuiColorPath from '@blueshift-ui/core/dist/helpers/map-color-name-to-mui-color-path';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

interface StepperSummaryItemProps {
  /**
   * Children of the summary item. Displayed as the main content of the summary item.
   */
  children?: ReactNode;
  /**
   * Icon to be displayed in the summary item. Displayed as the leading element of the summary item.
   */
  icon?: ReactNode;
  /**
   * Color of the icon. If provided, it will be used as the color of the icon.
   * @default 'primary'
   */
  iconColor?: ColorName;
  /**
   * Callback to be executed when the edit button is clicked.
   */
  onEdit?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function StepperSummaryItem({
  children,
  icon,
  iconColor = 'secondary',
  onEdit,
}: StepperSummaryItemProps) {
  /* Hooks */

  const { translate } = useTranslation('stepper', { ns: 'blueshift-ui' });

  /* Render */

  return (
    <Stack className={styles.root} component="li" direction="row" spacing={2}>
      <Stack className={styles.content} component="figure" direction="row" spacing={2}>
        {icon ? (
          <Box aria-hidden="true" color={mapColorNameToMuiColorPath(iconColor)}>
            {icon}
          </Box>
        ) : null}
        <Stack className={styles.details} component="figcaption" direction="column" spacing={0.5}>
          {children}
        </Stack>
      </Stack>

      {onEdit ? (
        <IconButton
          aria-label={translate('stepper_summary_item_edit_label')}
          className={styles.editButton}
          onClick={onEdit}
          size="small"
        >
          <PenIcon size={32} />
        </IconButton>
      ) : null}
    </Stack>
  );
}

export default StepperSummaryItem;
