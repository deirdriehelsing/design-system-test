import type {
  NavContentItem,
  NavItemApplicationId,
  SiteNavApplicationId,
  SiteNavBaseProps,
} from '../../../../types';
import type { UseDataResult } from '@blueshift-ui/fetch';
import type { UseNspContentResponse } from '@blueshift-ui/nsp/dist/hooks/use-nsp-content';

import { useCallback, useMemo } from 'react';
import { NavLinks } from '../../../../constants';
import processNavItemsList from '../../helpers/process-nav-items-list';
import urlTransformationStrategyFactory from '../../helpers/url-transformation-strategy-factory';
import useCheckFeatureAccess from '@blueshift-ui/auth/dist/hooks/use-check-feature-access';
import useNspContent from '@blueshift-ui/nsp/dist/hooks/use-nsp-content';

interface NavContentItemWithApplicationId extends NavContentItem {
  // We have to support both `applicationId` and `application_id` due to how Dato transforms fields for top-level models, but leaves JSON fields as-is. We map this to `application_id` below.
  applicationId?: NavItemApplicationId;
}

interface UseNavContentDataDataResult {
  accountNavItems: NavContentItem[];
  logoNavItem?: NavContentItem;
  primaryNavItems: NavContentItem[];
  unreadMessageNavItem?: NavContentItem;
}

interface UseNavContentDataParams {
  baseUrl?: SiteNavBaseProps['baseUrl'];
  currentApplicationId?: SiteNavApplicationId;
  preview?: boolean;
  slug?: string;
}

interface NavigationData {
  navigation: {
    menus: {
      applicationId: NavItemApplicationId;
      href: string;
      items: NavContentItemWithApplicationId[];
      slug: string;
      text: string;
    }[];
    slug: string;
  };
}

const gql = String.raw;
const query = gql`
  query SiteNav($slug: String, $locale: SiteLocale = en) {
    navigation(filter: { slug: { eq: $slug } }, locale: $locale, orderBy: _createdAt_ASC) {
      menus {
        applicationId
        href
        items
        slug
        text
      }
      slug
    }
  }
`;

function useNavContentData({
  currentApplicationId,
  preview = false,
  slug,
  baseUrl,
}: UseNavContentDataParams): UseDataResult<UseNavContentDataDataResult> {
  const { checkAccess, isLoading: isLoadingFeatureAccess } = useCheckFeatureAccess();

  const urlTransformationStrategy = useMemo(
    () => urlTransformationStrategyFactory({ currentApplicationId, baseURL: baseUrl }),
    [currentApplicationId, baseUrl]
  );

  const processMenuItems = useCallback(
    (items: NavContentItemWithApplicationId[]): NavContentItemWithApplicationId[] => {
      return processNavItemsList({
        items,
        urlTransformationStrategy,
        checkAccess,
        isLoadingFeatureAccess,
      });
    },
    [checkAccess, isLoadingFeatureAccess, urlTransformationStrategy]
  );

  return useNspContent<NavigationData, UseNavContentDataDataResult>({
    preview,
    query,
    queryKey: [slug, preview],
    queryId: `navigation/${slug}`,
    queryOptions: {
      enabled: Boolean(slug),
      select: useCallback(
        (response: UseNspContentResponse<NavigationData>) => {
          const data = response?.results?.[0]?.data;

          if (!data) {
            return data;
          }

          const navContentItems = data.navigation?.menus ?? [];
          const navContentItemsWithMenus =
            navContentItems.filter((menu: NavContentItem) => menu.items?.length || menu.href) ?? [];

          const accountNavItems = processMenuItems(
            navContentItemsWithMenus.filter(
              (item: NavContentItem) => item.slug?.startsWith('account_') ?? false
            )
          );

          const logoNavItems = processMenuItems(
            navContentItems.filter((item: NavContentItem) => item.slug?.startsWith('logo') ?? false)
          );
          const logoNavItem = logoNavItems?.map(
            (item) => ({ ...item, application_id: item.applicationId }) as NavContentItem
          )?.[0];

          const primaryNavItems = processMenuItems(
            navContentItemsWithMenus.filter(
              (item: NavContentItem) =>
                !item.slug?.startsWith('logo_') && !item.slug?.startsWith('account_')
            )
          );

          const unreadMessageNavItem = {
            href: urlTransformationStrategy(NavLinks.UNREAD_MESSAGES, 'my-learning'),
            slug: 'message',
          };

          return {
            accountNavItems,
            logoNavItem,
            primaryNavItems,
            unreadMessageNavItem,
          };
        },
        [processMenuItems, urlTransformationStrategy]
      ),
    },
    variables: {
      slug,
      // TODO: connect this to i18n
      locale: 'en',
    },
  });
}

export { query, useNavContentData };

export default useNavContentData;
