import type { ActiveLearner, AuthenticatedUser } from '@blueshift-ui/auth';
import type { AllOrNoneSiteNavApplicationProps, NavContentItem } from '../../../../types';

import * as styles from './index.css';
import Avatar from '@blueshift-ui/data-display/dist/components/avatar';
import Button from '@blueshift-ui/core/dist/components/button';
import DropdownButton from '../dropdown-button';
import Menu from '../../../menu';
import Messages from './components/messages';
import SignInLink from '../sign-in-link';
import buildRenderableNavItems from '../../helpers/build-renderable-nav-items';
import { useMemo } from 'react';

interface _AccountNavTriggerProps {
  activeLearner?: ActiveLearner;
  translate: (key: string, fallback: any) => string;
  user?: AuthenticatedUser;
  withAvatar: boolean;
  withDrawer?: boolean;
}

function _AccountNavTrigger({
  activeLearner,
  translate,
  user,
  withAvatar = false,
  withDrawer = false,
}: _AccountNavTriggerProps) {
  if (withAvatar && activeLearner) {
    const learnerIndex = user?.students?.indexOf(activeLearner) ?? 0;
    return (
      <>
        {!withDrawer && (
          <span className={styles.userName}>
            {`${activeLearner.first_name} ${activeLearner.last_name?.[0] ?? ''}`.trim()}
          </span>
        )}
        <Avatar
          backgroundVariant="outlined"
          index={learnerIndex}
          userName={[activeLearner.first_name, activeLearner.last_name]}
        />
      </>
    );
  }

  return <>{translate('account', 'Account')}</>;
}

type AccountNavProps<TApplicationLinkProps> =
  AllOrNoneSiteNavApplicationProps<TApplicationLinkProps> & {
    activeLearner?: ActiveLearner;
    items: NavContentItem[];
    openOnHover?: boolean;
    preview?: boolean;
    renderMessages?: boolean;
    translate?: (key: string, fallback: any) => string;
    unreadMessageNavItem?: NavContentItem;
    unreadMessagesCount?: number;
    user?: AuthenticatedUser;
    withAvatar?: boolean;
  };

const defaultTranslate = (key: string, fallback: any) => fallback ?? key;

function AccountNav<TApplicationLinkProps>({
  activeLearner,
  items,
  openOnHover = false,
  preview = false,
  renderMessages,
  translate = defaultTranslate,
  unreadMessageNavItem,
  unreadMessagesCount,
  user,
  withAvatar = false,
  applicationId,
  applicationLinkComponent,
  getApplicationLinkComponentProps,
}: AccountNavProps<TApplicationLinkProps>) {
  const menuItems = useMemo(
    () =>
      items?.map(({ items: contentItems, ...rest }) => ({
        items: buildRenderableNavItems(contentItems, {
          applicationId,
          applicationLinkComponent,
          getApplicationLinkComponentProps,
        }),
        ...rest,
      })),
    [items, applicationId, applicationLinkComponent, getApplicationLinkComponentProps]
  );

  if (!user) {
    return <SignInLink className={styles.signInLink} preview={preview} translate={translate} />;
  }

  return (
    <>
      {menuItems.length && renderMessages ? (
        <Messages
          applicationLinkComponent={applicationLinkComponent}
          getApplicationLinkComponentProps={getApplicationLinkComponentProps}
          messageNavItem={unreadMessageNavItem}
          unreadMessagesCount={unreadMessagesCount}
        />
      ) : null}
      {menuItems.map(({ items, slug }, index) => {
        if (!items?.length) {
          return null;
        }

        return (
          <Menu
            items={items}
            key={slug ?? index}
            openOnHover={openOnHover}
            trigger={user ? DropdownButton : Button}
            triggerProps={{
              color: 'inherit',
              disableRipple: true,
              disableElevation: true,
              variant: 'text',
              children: (
                <_AccountNavTrigger
                  activeLearner={activeLearner}
                  translate={translate}
                  user={user}
                  withAvatar={withAvatar}
                />
              ),
            }}
          />
        );
      })}
    </>
  );
}

export default AccountNav;
