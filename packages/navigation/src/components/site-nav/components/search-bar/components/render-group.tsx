import type { AutocompleteRenderGroupParams } from '@mui/material';
import type { ReactNode } from 'react';
import type { TranslationFunction } from '@blueshift-ui/i18n';

import * as styles from '../index.css';
import { Books as BooksIcon, UsersThree as UsersThreeIcon } from '@phosphor-icons/react';
import RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';
import Typography from '@blueshift-ui/theme/dist/components/typography';

interface RenderGroupProps extends AutocompleteRenderGroupParams {
  translate: TranslationFunction<string>;
}

function renderGroup({ group, children, key, translate }: RenderGroupProps): ReactNode {
  const Icon = group === RESULT_TYPE.class ? UsersThreeIcon : BooksIcon;
  const groupHeadingName = RESULT_TYPE.class === group ? 'classes' : 'subjects';

  return (
    <li className={styles.heading} key={key}>
      <Typography className={styles.listTitle}>
        <Icon size={24} weight="duotone" /> {translate(`${groupHeadingName}_heading`)}
      </Typography>

      <ul className={styles.group}>{children}</ul>
    </li>
  );
}

export default renderGroup;
