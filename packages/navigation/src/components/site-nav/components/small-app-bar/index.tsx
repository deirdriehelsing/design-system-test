import type { SiteNavProps } from '../../../../types';

import * as sharedStyles from '../../index.css';
import * as styles from './index.css';
import { IconButton, Skeleton } from '@mui/material';
import { useCallback, useState } from 'react';
import AppBar from '@blueshift-ui/surfaces/dist/components/app-bar';
import Box from '@blueshift-ui/core/dist/components/box';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react';
import Messages from '../account-nav/components/messages';
import PrimaryNav from '../primary-nav';
import SearchView from '../search-view';
import SignInLink from '../sign-in-link';
import SiteLogo from '../logo';
import classNames from 'clsx';
import useNavContentData from '../../hooks/use-nav-content-data';
import useNavItems from './hooks/use-nav-items';
import useScrollLock from '../../hooks/use-scroll-lock';

interface SmallAppBarProps<TApplicationLinkProps>
  extends Pick<
    SiteNavProps<TApplicationLinkProps>,
    | 'activeLearner'
    | 'className'
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

function SmallAppBar<TApplicationLinkProps>({
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
  renderPrimaryNav = false,
  renderSearchbar = false,
  renderMessages = false,
  searchBarProps,
  unreadMessagesCount,
  user,
  ...appBarProps
}: SmallAppBarProps<TApplicationLinkProps>) {
  const {
    data: { accountNavItems = [], logoNavItem, primaryNavItems = [], unreadMessageNavItem } = {},
    isLoading: isDataLoading,
  } = useNavContentData({ baseUrl, currentApplicationId: applicationId, preview, slug: navSlug });

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useScrollLock(isSearchVisible);

  const handleSearchSubmit = useCallback(
    (query: string) => {
      setIsSearchVisible(false);
      onSearchSubmit?.(query);
    },
    [onSearchSubmit]
  );

  const handleSearchToggle = useCallback(() => setIsSearchVisible((prev) => !prev), []);

  const navItems = useNavItems({
    activeLearner,
    accountNavItems,
    primaryNavItems,
    renderMessages,
    renderPrimaryNav,
    renderSearchbar,
    setIsSearchVisible,
    user,
  });

  return (
    <AppBar {...appBarProps} className={classNames(styles.appBar, appBarProps.className)}>
      <SiteLogo
        applicationId={applicationId}
        applicationLinkComponent={applicationLinkComponent}
        getApplicationLinkComponentProps={getApplicationLinkComponentProps}
        navItem={logoNavItem}
      />

      <Box className={sharedStyles.primaryNavContainer} sx={{ flexGrow: { [breakpoint]: 1 } }}>
        {isDataLoading ? (
          <Skeleton
            animation="pulse"
            aria-label="loading"
            sx={{ marginRight: '0.5rem' }}
            variant="text"
            width={40}
          />
        ) : (
          <>
            {renderMessages ? (
              // We show either messages icon OR search icon on mobile, but not both.
              // If we show the messages icon, the search icon goes into the hamburger nav.
              <Messages
                applicationLinkComponent={applicationLinkComponent}
                getApplicationLinkComponentProps={getApplicationLinkComponentProps}
                messageNavItem={unreadMessageNavItem}
                unreadMessagesCount={unreadMessagesCount}
              />
            ) : renderSearchbar ? (
              <IconButton
                aria-controls="search-view"
                aria-expanded={isSearchVisible}
                aria-label="search"
                color="inherit"
                onClick={handleSearchToggle}
              >
                <MagnifyingGlassIcon size={26} weight="duotone" />
              </IconButton>
            ) : null}

            {user ? (
              <PrimaryNav
                applicationId={applicationId}
                applicationLinkComponent={applicationLinkComponent}
                asDrawer={true}
                getApplicationLinkComponentProps={getApplicationLinkComponentProps}
                items={navItems}
                openOnHover={openOnHover}
              />
            ) : (
              <SignInLink preview={preview} />
            )}
          </>
        )}
      </Box>

      {isSearchVisible ? (
        <SearchView
          applicationId={applicationId}
          baseUrl={baseUrl}
          onClose={handleSearchToggle}
          onSubmit={handleSearchSubmit}
          searchBarProps={searchBarProps}
        />
      ) : null}
    </AppBar>
  );
}

export default SmallAppBar;
