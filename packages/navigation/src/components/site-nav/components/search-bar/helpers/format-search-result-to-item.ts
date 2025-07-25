import type { CatalogItemWithType, EmptyStateOption, ExpandLink } from '../../../../../types';
import type { ClassItem, SubjectItem } from '@blueshift-ui/search';

import RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';

function formatSearchResultToItem<
  SearchResultType extends CatalogItemWithType<ClassItem> | CatalogItemWithType<SubjectItem>,
>(
  searchResult: SearchResultType[],
  type: (typeof RESULT_TYPE)[keyof typeof RESULT_TYPE],
  hasAccessToExpandedSearch?: boolean
): (SearchResultType | ExpandLink)[] | [EmptyStateOption] {
  if (!searchResult.length) {
    return [
      {
        type,
        isExpandLink: false,
        isEmptyStateOption: true,
        _source: { name: type === RESULT_TYPE.class ? 'classEmpty' : 'subjectEmpty' },
      },
    ] as [EmptyStateOption];
  }

  if (!hasAccessToExpandedSearch) {
    return searchResult;
  }

  const expandLink = {
    type,
    isExpandLink: true,
    _source: { name: type === RESULT_TYPE.class ? 'classLink' : 'subjectLink' },
  };

  return [...searchResult, expandLink] as SearchResultType[];
}

export default formatSearchResultToItem;
