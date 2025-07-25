import type { SearchbarAutocompleteItem } from '../../../../../types';

import RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';

function getOptionName(option: SearchbarAutocompleteItem) {
  if (option.isEmptyStateOption) {
    return '';
  }
  if (option.isExpandLink) {
    return '';
  }

  const firstOptionName =
    option.type === RESULT_TYPE.class
      ? option._source.title_formatted
      : option._source.display_name;

  return firstOptionName || option._source.name;
}

export default getOptionName;
