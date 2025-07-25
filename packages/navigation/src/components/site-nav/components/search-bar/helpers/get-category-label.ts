import type { SearchbarAutocompleteItem } from '../../../../../types';

import RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';

const CLASS_TYPES = {
  smallGroupClass: 'Small Group Class',
  starCourse: 'Star Course',
};

const SUBJECT_TYPES = {
  subjectGuide: 'Subject Guide',
  tutorRequest: 'Tutor Request',
};

function getCategoryLabel(item: SearchbarAutocompleteItem) {
  if (item.isExpandLink) {
    return '';
  }
  if (item.isEmptyStateOption) {
    return '';
  }

  if (item.type === RESULT_TYPE.class) {
    return item._source.business_units?.includes('Celebrity')
      ? CLASS_TYPES.starCourse
      : CLASS_TYPES.smallGroupClass;
  }
  return item._source.has_detail_page ? SUBJECT_TYPES.subjectGuide : SUBJECT_TYPES.tutorRequest;
}

export default getCategoryLabel;
