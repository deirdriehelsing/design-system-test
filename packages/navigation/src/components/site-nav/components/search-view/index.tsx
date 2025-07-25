import type {
  SearchBarProps,
  SiteNavApplicationId,
  SiteNavBaseProps,
  SiteNavProps,
} from '../../../../types';
import type { SearchbarAutocompleteItem } from '../../../../types';

import * as styles from './index.css';
import Button from '@blueshift-ui/core/dist/components/button';
import SearchBar from '../search-bar';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

interface SearchViewProps {
  applicationId?: SiteNavApplicationId;
  baseUrl?: SiteNavBaseProps['baseUrl'];
  onClose: () => void;
  onSubmit?: SiteNavProps<any>['onSearchSubmit'];
  searchBarProps?: SearchBarProps<SearchbarAutocompleteItem>;
}

function SearchView({
  applicationId,
  baseUrl,
  onClose,
  onSubmit,
  searchBarProps,
}: SearchViewProps) {
  const { translate } = useTranslation('search', { ns: 'blueshift-ui', useSuspense: false });

  return (
    <div className={styles.container} id="search-view">
      <div className={styles.search}>
        <SearchBar
          applicationId={applicationId}
          baseUrl={baseUrl}
          onSubmit={onSubmit}
          {...searchBarProps}
        />

        <Button className={styles.cancelButton} color="inherit" onClick={onClose} variant="text">
          {translate('cancel')}
        </Button>
      </div>
    </div>
  );
}

export default SearchView;
