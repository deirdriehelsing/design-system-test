import type { ActiveLearner, AuthenticatedUser } from '@blueshift-ui/auth';
import type { AppBarProps } from '@blueshift-ui/surfaces';
import type { NavContentItem } from './nav-content';
import type React from 'react';
import type { SearchBarProps } from './search-bar-props';
import type { SearchbarAutocompleteItem } from './search-autocomplete';

// Applications where <SiteNav> is used. Refer to NavItemApplicationId in packages/navigation/src/types/nav-content.ts for the list of application IDs used in navigation items provided by DatoCMS.
type SiteNavApplicationId = 'client-account' | 'login-ui' | 'my-learning';

// Either gets all application props or none
type AllOrNoneSiteNavApplicationProps<TApplicationLinkProps> =
  | SiteNavApplicationProps<TApplicationLinkProps>
  | Partial<Record<keyof SiteNavApplicationProps<TApplicationLinkProps>, never>>;

interface SiteNavApplicationProps<TApplicationLinkProps> {
  applicationId?: SiteNavApplicationId; // optional due to AllOrNoneSiteNavApplicationProps usage in SiteNav subcomponents
  applicationLinkComponent?: React.ElementType<TApplicationLinkProps>;
  getApplicationLinkComponentProps?: (item: NavContentItem) => TApplicationLinkProps;
}

interface SiteNavBaseProps extends Omit<AppBarProps, 'variant' | 'onSubmit'> {
  activeLearner?: ActiveLearner;
  baseUrl?: string;
  breakpoint?: 'md' | 'lg' | 'xl';
  navSlug?: string;
  onSearchSubmit?: (query: string) => void;
  openOnHover?: boolean;
  preview?: boolean;
  searchBarProps?: SearchBarProps<SearchbarAutocompleteItem>;
  unreadMessagesCount?: number;
  user?: AuthenticatedUser;
  variant?: 'account-only' | 'logo-only';
  withMessages?: boolean;
  withSearch?: boolean;
}

type SiteNavProps<TApplicationLinkProps> = AllOrNoneSiteNavApplicationProps<TApplicationLinkProps> &
  SiteNavBaseProps;

export type {
  AllOrNoneSiteNavApplicationProps,
  SiteNavApplicationId,
  SiteNavApplicationProps,
  SiteNavBaseProps,
  SiteNavProps,
};
