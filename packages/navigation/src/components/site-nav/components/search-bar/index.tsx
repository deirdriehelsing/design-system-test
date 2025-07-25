import type {
  CatalogItemWithType,
  EmptyStateOption,
  ExpandLink,
  SearchbarAutocompleteItem,
} from '../../../../types';
import type { ClassItem, SubjectItem } from '@blueshift-ui/search';
import type { SearchBarProps } from '../../../../types';
import type { SyntheticEvent } from 'react';

import * as styles from './index.css';
import React, { useEffect, useState } from 'react';
import EmptyResultFooter from './components/empty-result-footer';
import Paper from '@blueshift-ui/core/dist/components/paper';
import RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';
import RichTranslation from '@blueshift-ui/i18n/dist/components/rich-translation';
import SearchAutocomplete from './components/search-autocomplete';
import clsx from 'clsx';
import formatSearchResultToItem from './helpers/format-search-result-to-item';
import getLink from './helpers/get-link';
import renderGroup from './components/render-group';
import renderOption from './components/render-option';
import useClassesSearch from '@blueshift-ui/search/dist/hooks/use-classes-search';
import useFeatureAccess from '@blueshift-ui/auth/dist/hooks/use-feature-access';
import useInteractionTracker from '@blueshift-ui/telemetry/dist/hooks/use-interaction-tracker';
import useSubjectsSearch from '@blueshift-ui/search/dist/hooks/use-subjects-search';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

interface SearchResultListBaseProps {
  disableExpandSearch?: boolean;
  query: string;
  total: number;
}

interface SearchResultClassProps {
  content: [EmptyStateOption] | (CatalogItemWithType<ClassItem> | ExpandLink)[];
  variant: typeof RESULT_TYPE.class;
}

interface SearchResultSubjectProps {
  content: [EmptyStateOption] | (CatalogItemWithType<SubjectItem> | ExpandLink)[];
  variant: typeof RESULT_TYPE.subject;
}

type SearchResultListProps = SearchResultListBaseProps &
  (SearchResultClassProps | SearchResultSubjectProps);

function SearchBar({
  applicationId,
  baseUrl,
  onSubmit,
  searchInputProps,
}: SearchBarProps<SearchbarAutocompleteItem>) {
  const { hasAccess: isVt4sUser, isLoading: isVt4sUserLoading } = useFeatureAccess({
    criteria: {
      productState: (userProductState) => userProductState === 'vt4s',
    },
  });

  const { hasAccess: hasActiveMembership } = useFeatureAccess({
    criteria: { enablement: 'active_membership' },
  });

  const { hasAccess: hasAccessToClasses, isLoading: isLoadingClassesAccess } = useFeatureAccess({
    criteria: { enablement: 'live_classes' },
  });

  const hasAccessToExpandedSearch = !isVt4sUser;
  const shouldRenderClasses = hasAccessToClasses || !isVt4sUser;

  const {
    results: classes,
    setSearchString: queryClasses,
    isLoading: isClassesLoading,
  } = useClassesSearch({
    perPage: 5,
  });

  const classesWithType =
    (classes?.hits?.hits?.map((item) => ({
      ...item,
      type: RESULT_TYPE.class,
      isEmptyStateOption: false,
      isExpandLink: false,
    })) as CatalogItemWithType<ClassItem>[]) || [];

  const classesToRender = shouldRenderClasses
    ? formatSearchResultToItem(classesWithType, RESULT_TYPE.class, hasAccessToExpandedSearch)
    : [];

  const {
    results: subjects,
    setSearchString: querySubjects,
    isLoading: isSubjectsLoading,
  } = useSubjectsSearch({
    perPage: 5,
  });

  const subjectsWithType =
    (subjects?.hits?.hits?.map((item) => ({
      ...item,
      type: RESULT_TYPE.subject,
      isEmptyStateOption: false,
      isExpandLink: false,
    })) as CatalogItemWithType<SubjectItem>[]) || [];

  const subjectsToRender = formatSearchResultToItem(
    subjectsWithType,
    RESULT_TYPE.subject,
    hasAccessToExpandedSearch
  );

  const { trackEvent } = useInteractionTracker();
  const { translate } = useTranslation('search', { ns: 'blueshift-ui', useSuspense: false });
  const { translate: richTranslate } = useTranslation('search', { rich: true, ns: 'blueshift-ui' });

  const [query, setQuery] = useState('');

  const searchResultList: SearchResultListProps[] = [
    {
      content: subjectsToRender,
      query,
      total: subjects?.hits?.total?.value ?? 0,
      variant: RESULT_TYPE.subject,
    },
    {
      content: classesToRender,
      disableExpandSearch: !hasAccessToExpandedSearch,
      query,
      total: classes?.hits?.total?.value ?? 0,
      variant: RESULT_TYPE.class,
    },
  ];

  const searchResultItems = searchResultList.reduce<SearchbarAutocompleteItem[]>(
    (accumulator, { content }) => accumulator.concat(content),
    []
  );

  const [{ total: totalSubjects }, { total: totalClasses }] = searchResultList;

  const total = totalSubjects + totalClasses;
  const hasResults = total > 0;

  function handleSearch(newValue: string) {
    setQuery(newValue);
  }

  useEffect(() => {
    queryClasses(query);
    querySubjects(query);
  }, [query, queryClasses, querySubjects]);

  function clearInput() {
    setQuery('');
  }

  function groupBy(option: string | SearchbarAutocompleteItem) {
    if (typeof option === 'string') {
      return option;
    }

    return option.type;
  }

  function onInputChange(event: SyntheticEvent<Element, Event>, value: string) {
    handleSearch(value);
  }

  function getOptionLabel(option: string | SearchbarAutocompleteItem) {
    if (typeof option === 'string') {
      return option;
    }

    if (option.isEmptyStateOption || option.isExpandLink) {
      return '';
    }

    return option._source.name;
  }

  function handleOptionSelection(
    event: SyntheticEvent<Element, Event>,
    option: string | SearchbarAutocompleteItem
  ) {
    if (typeof option === 'string') {
      return;
    }

    window.location.href = getLink({
      applicationId,
      baseUrl,
      hasActiveMembership,
      item: option,
      query,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement | HTMLDivElement>) {
    event.preventDefault();

    onSubmit?.(query);
    setQuery('');
  }

  function handleInputBlur() {
    trackEvent({
      action: 'search-blur',
      category: 'search-and-browse',
      label: query,
    });
  }

  const isLoading =
    isClassesLoading || isSubjectsLoading || isLoadingClassesAccess || isVt4sUserLoading;

  return (
    <SearchAutocomplete
      clearInput={clearInput}
      getOptionLabel={getOptionLabel}
      groupBy={groupBy}
      handleOptionSelection={handleOptionSelection}
      inputLabel={translate('input_aria_label')}
      inputValue={query}
      isLoading={isLoading}
      noOptionsText={translate('empty_query_option')}
      onInputBlur={handleInputBlur}
      onInputChange={onInputChange}
      onSubmit={handleSubmit}
      options={
        query && !isLoading ? searchResultItems.sort((a, b) => b.type.localeCompare(a.type)) : []
      }
      PaperComponent={(props) => (
        <Paper {...props} className={clsx(props.className, styles.paper)}>
          {props.children}

          {!hasResults && !isLoading && (
            <EmptyResultFooter
              message={<RichTranslation i18nKey="contact_us" translator={richTranslate} />}
              title={translate('no_content_title')}
            />
          )}
        </Paper>
      )}
      placeholder={translate('input_placeholder')}
      renderGroup={(props) => renderGroup({ ...props, translate })}
      renderOption={(props, option) =>
        renderOption(props, option, {
          applicationId,
          baseUrl,
          hasActiveMembership,
          query,
          totalClasses,
          totalSubjects,
          trackEvent,
          translate,
        })
      }
      searchInputProps={searchInputProps}
    />
  );
}

export default SearchBar;
