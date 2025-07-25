import type { AuthenticatedUser, Student } from '@blueshift-ui/auth';
import type { NavContentItem } from '../../../../../../types';

import * as styles from '../../index.css';
import LearnerNavItemText from '../../../../components/learner-nav-item-text';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useMemo } from 'react';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

interface UseNavItemsProps {
  accountNavItems: NavContentItem[];
  activeLearner?: Student;
  primaryNavItems: NavContentItem[];
  renderMessages: boolean;
  renderPrimaryNav: boolean;
  renderSearchbar: boolean;
  setIsSearchVisible: (value: boolean) => void;
  user?: AuthenticatedUser;
}

function useNavItems({
  accountNavItems,
  activeLearner,
  primaryNavItems,
  renderMessages,
  renderPrimaryNav,
  renderSearchbar,
  setIsSearchVisible,
  user,
}: UseNavItemsProps) {
  const { translate } = useTranslation('search', { ns: 'blueshift-ui', useSuspense: false });

  return useMemo<NavContentItem[]>(() => {
    if (!renderPrimaryNav) {
      return accountNavItems?.[0]?.items ?? [];
    }

    const searchNav: NavContentItem[] =
      renderSearchbar && renderMessages
        ? [
            {
              slug: 'search',
              // only open search on next frame after the menu drawer has closed
              onClick: () => requestAnimationFrame(() => setIsSearchVisible(true)),
              text: (
                <div className={styles.searchMenuItem}>
                  <MagnifyingGlassIcon color="neutral" size={26} weight="duotone" />
                  {translate('search')}
                </div>
              ),
            },
          ]
        : [];

    const accountNav: NavContentItem[] = activeLearner
      ? [
          {
            ...accountNavItems[0],
            text: <LearnerNavItemText activeLearner={activeLearner} user={user} />,
          },
        ]
      : accountNavItems;

    return [...searchNav, ...primaryNavItems, ...accountNav];
  }, [
    activeLearner,
    accountNavItems,
    primaryNavItems,
    renderMessages,
    renderSearchbar,
    renderPrimaryNav,
    setIsSearchVisible,
    translate,
    user,
  ]);
}

export default useNavItems;
