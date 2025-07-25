import type { HTMLAttributes, ReactNode } from 'react';
import type { SearchbarAutocompleteItem, SiteNavApplicationId } from '../../../../../types';
import type { TranslationFunction } from '@blueshift-ui/i18n';
import type useInteractionTracker from '@blueshift-ui/telemetry/dist/hooks/use-interaction-tracker';

import * as styles from '../index.css';
import Link from '@blueshift-ui/core/dist/components/link';
import RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import getCategoryLabel from '../helpers/get-category-label';
import getLink from '../helpers/get-link';
import getOptionName from '../helpers/get-option-name';

interface CustomArgsRenderOption {
  applicationId?: SiteNavApplicationId;
  baseUrl?: string;
  hasActiveMembership?: boolean;
  query: string;
  totalClasses: number;
  totalSubjects: number;
  trackEvent: ReturnType<typeof useInteractionTracker>['trackEvent'];
  translate: TranslationFunction<string>;
}

function renderOption(
  props: HTMLAttributes<HTMLLIElement>,
  option: SearchbarAutocompleteItem,
  {
    applicationId,
    baseUrl,
    hasActiveMembership,
    query,
    translate,
    trackEvent,
    totalClasses,
    totalSubjects,
  }: CustomArgsRenderOption
): ReactNode {
  if (option.isEmptyStateOption) {
    return (
      <Typography {...props} className={styles.emptyResultsText}>
        {translate('no_results')}
      </Typography>
    );
  }

  if (option.isExpandLink) {
    const { type } = option;

    return (
      <li {...props} className={`${props.className} ${styles.expandSearch}`}>
        <Link
          className={styles.linkItem}
          href={getLink({ applicationId, baseUrl, hasActiveMembership, item: option, query })}
          onClick={() =>
            trackEvent({
              action: `search-${type}`,
              category: 'search-and-browse',
              label: query,
            })
          }
          underline="none"
        >
          {translate('expand_search', {
            query,
            total: type === RESULT_TYPE.class ? totalClasses : totalSubjects,
            variant: type === RESULT_TYPE.class ? 'classes' : 'subject',
          })}
        </Link>
      </li>
    );
  }

  return (
    <li {...props} className={`${props.className} ${styles.listItem}`}>
      <Link
        className={styles.linkItem}
        href={getLink({ applicationId, baseUrl, hasActiveMembership, item: option, query })}
        underline="none"
      >
        <Typography className={styles.resultTitle} component="h3">
          {getOptionName(option)}
        </Typography>

        <Typography className={styles.resultLabel} component="p">
          {getCategoryLabel(option)}
        </Typography>
      </Link>
    </li>
  );
}

export default renderOption;
