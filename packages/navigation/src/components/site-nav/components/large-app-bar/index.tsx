import type { AllOrNoneSiteNavApplicationProps, NavItem, SiteNavProps } from '../../../../types';

import * as sharedStyles from '../../index.css';
import * as styles from './index.css';
import AccountNav from '../account-nav';
import AccountNavSkeleton from '../account-nav/components/account-nav-skeleton';
import AppBar from '@blueshift-ui/surfaces/dist/components/app-bar';
import Box from '@blueshift-ui/core/dist/components/box';
import PrimaryNav from '../primary-nav';
import PrimaryNavSkeleton from '../primary-nav/components/primary-nav-skeleton';
import SearchBar from '../search-bar';
import SiteLogo from '../logo';
import clsx from 'clsx';
import useNavContentData from '../../hooks/use-nav-content-data';

interface LargeAppBarProps<TApplicationLinkProps>
  extends Pick<
    SiteNavProps<TApplicationLinkProps>,
    | 'activeLearner'
    | 'applicationId'
    | 'applicationLinkComponent'
    | 'baseUrl'
    | 'breakpoint'
    | 'getApplicationLinkComponentProps'
    | 'navSlug'
    | 'onSearchSubmit'
    | 'openOnHover'
    | 'preview'
    | 'searchBarProps'
    | 'unreadMessagesCount'
    | 'user'
  > {
  accountOnly: boolean;
  renderMessages?: boolean;
  renderPrimaryNav?: boolean;
  renderSearchbar?: boolean;
}

const EMPTY: NavItem[] = [];

function LargeAppBar<TApplicationLinkProps>({
  activeLearner,
  accountOnly,
  applicationId,
  applicationLinkComponent,
  baseUrl,
  breakpoint = 'lg',
  getApplicationLinkComponentProps,
  navSlug,
  onSearchSubmit,
  openOnHover,
  preview,
  renderMessages,
  renderPrimaryNav,
  renderSearchbar,
  unreadMessagesCount,
  searchBarProps,
  user,
  ...appBarProps
}: LargeAppBarProps<TApplicationLinkProps>) {
  const {
    data: {
      accountNavItems = EMPTY,
      logoNavItem,
      primaryNavItems = EMPTY,
      unreadMessageNavItem,
    } = {},
    isLoading: isDataLoading,
  } = useNavContentData({ baseUrl, currentApplicationId: applicationId, preview, slug: navSlug });

  const applicationLinkProps = {
    applicationId,
    applicationLinkComponent,
    getApplicationLinkComponentProps,
  } as AllOrNoneSiteNavApplicationProps<TApplicationLinkProps>;

  return (
    <AppBar {...appBarProps}>
      <div className={clsx(styles.container, { [styles.searchBarContainer]: renderSearchbar })}>
        <SiteLogo {...applicationLinkProps} navItem={logoNavItem} />

        {renderSearchbar ? (
          <SearchBar
            applicationId={applicationId}
            baseUrl={baseUrl}
            onSubmit={onSearchSubmit}
            {...searchBarProps}
          />
        ) : null}
      </div>

      <Box className={sharedStyles.primaryNavContainer} sx={{ flexGrow: { [breakpoint]: 1 } }}>
        {renderPrimaryNav &&
          (isDataLoading ? (
            <PrimaryNavSkeleton />
          ) : (
            <PrimaryNav
              {...applicationLinkProps}
              items={primaryNavItems}
              openOnHover={openOnHover}
            />
          ))}
      </Box>

      <Box className={styles.accountNavContainer} sx={{ flexGrow: { xs: 1, [breakpoint]: 0 } }}>
        {isDataLoading ? (
          <AccountNavSkeleton withAvatar={Boolean(!accountOnly && activeLearner)} />
        ) : (
          <AccountNav
            {...applicationLinkProps}
            activeLearner={activeLearner}
            items={accountNavItems}
            openOnHover={openOnHover}
            preview={preview}
            renderMessages={renderMessages}
            unreadMessageNavItem={unreadMessageNavItem}
            unreadMessagesCount={unreadMessagesCount}
            user={user}
            withAvatar={!accountOnly}
          />
        )}
      </Box>
    </AppBar>
  );
}

export default LargeAppBar;
