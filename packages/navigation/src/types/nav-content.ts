import type { ReactNode } from 'react';

// Navigation items applicationsId/application_id coming from DatoCMS.
type NavItemApplicationId = '' | 'client-account' | 'my-learning' | 'vtwa';

interface NavContent {
  menus: NavContentItem[];
  showCart: boolean;
  slug: string;
}

interface NavContentItem {
  alt_href?: string;
  alt_href_application_id?: NavItemApplicationId;
  application_id?: NavItemApplicationId;
  divider?: boolean;
  enablement?: string;
  feature_flag?: string;
  href?: string;
  items?: NavContentItem[];
  onClick?: () => void;
  slug?: string;
  target?: string;
  text?: ReactNode;
}

interface NavContentItemWithApplicationId extends NavContentItem {
  applicationId?: NavItemApplicationId;
}

export type { NavContent, NavContentItem, NavContentItemWithApplicationId, NavItemApplicationId };
