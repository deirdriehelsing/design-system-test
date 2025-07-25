import type { Theme as MuiTheme } from '@mui/material/styles';
import type { SiteNavProps } from '../../types';

import * as styles from './index.css';
import LargeAppBar from './components/large-app-bar';
import LogoOnlyAppBar from './components/logo-only-app-bar';
import SmallAppBar from './components/small-app-bar';
import clsx from 'clsx';
import useMediaQuery from '@blueshift-ui/theme/dist/hooks/use-media-query';

function SiteNav<TApplicationLinkProps>({
  activeLearner,
  applicationId,
  applicationLinkComponent,
  baseUrl,
  breakpoint = 'lg',
  getApplicationLinkComponentProps,
  navSlug,
  onSearchSubmit,
  openOnHover,
  preview = false,
  searchBarProps,
  unreadMessagesCount,
  user,
  variant,
  withMessages,
  withSearch = false,
  ...appBarProps
}: SiteNavProps<TApplicationLinkProps>) {
  const isViewportLargerThanBreakpoint = useMediaQuery((theme: MuiTheme) =>
    theme.breakpoints.up(breakpoint)
  );

  if (!navSlug || variant === 'logo-only') {
    return (
      <LogoOnlyAppBar
        {...appBarProps}
        applicationId={applicationId}
        applicationLinkComponent={applicationLinkComponent}
        getApplicationLinkComponentProps={getApplicationLinkComponentProps}
        largeAppBar={isViewportLargerThanBreakpoint}
        navSlug={navSlug}
        preview={preview}
      />
    );
  }

  const accountOnly = variant === 'account-only';
  const renderMessages = user && withMessages;
  const renderPrimaryNav = user && !accountOnly;
  const renderSearchbar = withSearch && renderPrimaryNav;

  const AppBarComponent = isViewportLargerThanBreakpoint ? LargeAppBar : SmallAppBar;

  return (
    <AppBarComponent
      {...appBarProps}
      accountOnly={accountOnly}
      activeLearner={activeLearner}
      applicationId={applicationId}
      applicationLinkComponent={applicationLinkComponent}
      baseUrl={baseUrl}
      breakpoint={breakpoint}
      className={clsx(appBarProps.className, styles.appBar)}
      getApplicationLinkComponentProps={getApplicationLinkComponentProps}
      navSlug={navSlug}
      onSearchSubmit={onSearchSubmit}
      openOnHover={openOnHover}
      preview={preview}
      renderMessages={renderMessages}
      renderPrimaryNav={renderPrimaryNav}
      renderSearchbar={renderSearchbar}
      searchBarProps={searchBarProps}
      unreadMessagesCount={unreadMessagesCount}
      user={user}
    />
  );
}

export default SiteNav;
