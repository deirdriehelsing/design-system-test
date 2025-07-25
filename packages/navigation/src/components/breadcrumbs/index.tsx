import type { BreadcrumbsProps } from '../../types';

import * as styles from './index.css';
import Breadcrumb from './components/breadcrumb';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

const DEFAULT_SEPARATOR = (
  <CaretRightIcon className={styles.defaultSeparator} size={16} weight="duotone" />
);

function Breadcrumbs({
  items,
  separator = DEFAULT_SEPARATOR,
  ...breadcrumbsProps
}: BreadcrumbsProps) {
  return (
    <MuiBreadcrumbs separator={separator} {...breadcrumbsProps}>
      {items.map((item, index) => (
        <Breadcrumb
          {...item}
          key={index}
          variant={index === items.length - 1 ? 'titleSmallProminent' : 'titleSmall'}
        />
      ))}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
