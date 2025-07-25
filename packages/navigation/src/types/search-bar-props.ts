import type { SiteNavApplicationId, SiteNavBaseProps, SiteNavProps } from './site-nav-props';
import type { SearchAutocompleteProps } from './index';
import type { SearchbarAutocompleteItem } from './index';

interface SearchBarProps<AutocompleteItem = SearchbarAutocompleteItem> {
  applicationId?: SiteNavApplicationId;
  baseUrl?: SiteNavBaseProps['baseUrl'];
  onSubmit?: SiteNavProps<any>['onSearchSubmit'];
  searchInputProps?: SearchAutocompleteProps<AutocompleteItem>;
}

export type { SearchBarProps };
