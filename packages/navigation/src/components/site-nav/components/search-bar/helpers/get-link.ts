import type {
  SearchbarAutocompleteItem,
  SiteNavApplicationId,
  SiteNavBaseProps,
} from '../../../../../types';

import RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';

// Prepend baseUrl (vtstaging/varsitytutors.com) to search results links if applicationId is not my-learning (learning-discovery-ui repository)
function getPrefixedUrl(
  path: string,
  baseUrl: SiteNavBaseProps['baseUrl'],
  applicationId?: SiteNavApplicationId
): string {
  if (applicationId !== 'my-learning') {
    if (!baseUrl) {
      throw new Error('baseUrl prop is required for non-my-learning applications SiteNav');
    }

    return `${baseUrl}${path}`;
  }

  return path;
}

interface GetLinkParams {
  applicationId?: SiteNavApplicationId;
  baseUrl: SiteNavBaseProps['baseUrl'];
  hasActiveMembership?: boolean;
  item: SearchbarAutocompleteItem;
  query: string;
}

function getLink({ applicationId, baseUrl, hasActiveMembership, item, query }: GetLinkParams) {
  if (item.isEmptyStateOption) {
    return '';
  }

  if (item.isExpandLink) {
    const expandPath = `/${item.type === RESULT_TYPE.class ? 'classes' : 'my-learning'}/search?q=${query}`;
    return getPrefixedUrl(expandPath, baseUrl, applicationId);
  }

  const vtintref = 'search-suggestion';

  if (item.type === RESULT_TYPE.class) {
    return `${item._source.details_page}?vtintref=${vtintref}`;
  }

  const urlSlug = item._source.slug?.replaceAll('_', '-');

  if (item._source.has_detail_page && urlSlug) {
    const detailPath = `/my-learning/subjects/${urlSlug}?vtintref=${vtintref}`;
    return getPrefixedUrl(detailPath, baseUrl, applicationId);
  }

  const newTutorPath = `/my-learning/tutors/new?vtintref=${vtintref}&subject=${urlSlug}&subject_id=${item._source.id}`;
  const newTutorUrl = getPrefixedUrl(newTutorPath, baseUrl, applicationId);

  if (hasActiveMembership) {
    return newTutorUrl;
  }

  const membershipsPath = `/memberships?vtintref=${vtintref}&returnurl=${encodeURIComponent(newTutorUrl)}`;
  return getPrefixedUrl(membershipsPath, baseUrl, applicationId);
}

export default getLink;
