import type {
  AllOrNoneSiteNavApplicationProps,
  NavAction,
  NavContentItem,
  NavItem,
  NestedNav,
} from '../../../../types';

import Button from '@blueshift-ui/core/dist/components/button';
import Drawer from '@blueshift-ui/core/dist/components/drawer';
import DropdownButton from '../dropdown-button';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import List from '@blueshift-ui/core/dist/components/list';
import { List as ListIcon } from '@phosphor-icons/react';
import Menu from '../../../menu';
import buildRenderableNavItems from '../../helpers/build-renderable-nav-items';
import { useMemo } from 'react';

type PrimaryNavProps<TApplicationLinkProps> =
  AllOrNoneSiteNavApplicationProps<TApplicationLinkProps> & {
    asDrawer?: boolean;
    items: NavContentItem[];
    openOnHover?: boolean;
  };

function isNavAction<TProps>(item: NavItem<TProps>): item is NavAction<TProps> {
  return 'component' in item && 'componentProps' in item;
}

function isNestedNav(item: NavItem): item is NestedNav {
  return 'items' in item && Boolean(item.items.length);
}

function PrimaryNav<TApplicationLinkProps>({
  asDrawer = false,
  applicationId,
  applicationLinkComponent,
  getApplicationLinkComponentProps,
  items,
  openOnHover,
}: PrimaryNavProps<TApplicationLinkProps>) {
  const mappedItems = useMemo(
    () =>
      buildRenderableNavItems(items, {
        applicationId,
        applicationLinkComponent,
        getApplicationLinkComponentProps,
      }),
    [items, applicationId, applicationLinkComponent, getApplicationLinkComponentProps]
  );

  if (!mappedItems.length) {
    return null;
  }

  if (asDrawer) {
    return (
      <Drawer
        anchor="right"
        ariaLabel="Menu"
        trigger={IconButton}
        triggerProps={{ children: <ListIcon />, color: 'inherit' }}
        withCloseButton={true}
      >
        <List items={mappedItems} />
      </Drawer>
    );
  }

  return (
    <>
      {mappedItems.map((item, index) => {
        if (isNavAction(item)) {
          const { component: Component, componentProps, slug, text } = item;
          return (
            <Button
              {...componentProps}
              color="secondary"
              disableElevation={true}
              disableRipple={true}
              key={slug ?? index}
              LinkComponent={Component}
              variant="text"
            >
              {text}
            </Button>
          );
        }

        if (isNestedNav(item)) {
          const { items: contentItems, slug, text } = item;
          return (
            <Menu
              items={contentItems}
              key={slug ?? index}
              openOnHover={openOnHover}
              trigger={DropdownButton}
              triggerProps={{
                children: text,
                color: 'inherit',
                disableElevation: true,
                disableRipple: true,
                variant: 'text',
              }}
            />
          );
        }
      })}
    </>
  );
}

export default PrimaryNav;
