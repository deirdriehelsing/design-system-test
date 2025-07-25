import type { NavContentItem, SiteNavApplicationId } from '../../../../types';

import * as styles from './index.css';
import React from 'react';
import logoImage from '@blueshift-ui/theme/dist/assets/brand/logos/flat/full-color.svg?url';
import normalizeHref from '@blueshift-ui/core/dist/helpers/normalize-href';

interface SiteLogoProps<TApplicationLinkProps> {
  applicationId?: SiteNavApplicationId;
  applicationLinkComponent?: React.ElementType;
  getApplicationLinkComponentProps?: (item: NavContentItem) => TApplicationLinkProps;
  navItem?: NavContentItem;
}

function SiteLogo<TApplicationLinkProps>({
  applicationId,
  applicationLinkComponent: ApplicationLinkComponent,
  getApplicationLinkComponentProps,
  navItem,
}: SiteLogoProps<TApplicationLinkProps>) {
  if (navItem && applicationId === navItem.application_id && ApplicationLinkComponent) {
    const applicationLinkComponentProps = getApplicationLinkComponentProps?.(navItem);

    return (
      <ApplicationLinkComponent className={styles.homeLink} {...applicationLinkComponentProps}>
        <img alt="Varsity Tutors" src={logoImage} />
      </ApplicationLinkComponent>
    );
  }

  return (
    <a className={styles.homeLink} href={normalizeHref(navItem?.href ?? '/')}>
      <img alt="Varsity Tutors" src={logoImage} />
    </a>
  );
}

export default SiteLogo;
