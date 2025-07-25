import type { RichContent } from '@blueshift-ui/nsp/dist/types';

import * as styles from './index.css';
import NspRichContent from '@blueshift-ui/nsp/dist/components/nsp-rich-content';
import { Typography } from '@mui/material';

function ActionCardDescription({ description }: { description: RichContent | string }) {
  if (!description) {
    return null;
  }

  return (
    <Typography className={styles.descriptionText} component="p" variant="bodySmall">
      {typeof description === 'string' ? description : <NspRichContent data={description} />}
    </Typography>
  );
}

export default ActionCardDescription;
