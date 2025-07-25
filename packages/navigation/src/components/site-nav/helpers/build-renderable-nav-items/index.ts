import type { AllOrNoneSiteNavApplicationProps, NavContentItem, NavItem } from '../../../../types';

import generateComponentProps from '../generate-component-props';
import isNavItemActive from '../is-nav-item-active';
import selectLinkComponentType from '../select-link-component-type';

/**
 * Transforms raw navigation content items into structured nav items with resolved components and props.
 * Handles nested items, dividers, and action items with appropriate role assignments.
 */
function buildRenderableNavItems<TApplicationProps>(
  items?: NavContentItem[],
  applicationProps: AllOrNoneSiteNavApplicationProps<TApplicationProps> = {}
): NavItem[] {
  if (!items?.length) {
    return [];
  }

  return items.map((item) => {
    // Handle nested items
    if (item.items?.length) {
      return {
        items: buildRenderableNavItems(item.items, applicationProps),
        role: 'nested' as const,
        slug: item.slug,
        text: item.text,
      };
    }

    // Handle divider items
    if (item.divider) {
      return { role: 'divider' as const, slug: item.slug };
    }

    // Handle action items using new utilities
    return {
      // This is imperfect, but should work for the time being. TODO: Consider passing in a function
      // to determine if a link is active or not. Consumers will know a lot more about their
      // routes/routing than we do here.
      active: isNavItemActive(item),
      component: selectLinkComponentType(item, applicationProps),
      componentProps: generateComponentProps(item, applicationProps),
      role: 'action' as const,
      slug: item.slug,
      text: item.text,
    };
  });
}

export default buildRenderableNavItems;
