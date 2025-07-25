import type { SiteNavProps } from '../../../../types';

import AppBar from '@blueshift-ui/surfaces/dist/components/app-bar';
import SiteLogo from '../logo';
import useNavContentData from '../../hooks/use-nav-content-data';

interface LogoOnlyAppBarProps<TApplicationLinkProps>
  extends Pick<
    SiteNavProps<TApplicationLinkProps>,
    | 'applicationId'
    | 'applicationLinkComponent'
    | 'className'
    | 'getApplicationLinkComponentProps'
    | 'navSlug'
    | 'preview'
  > {
  largeAppBar?: boolean;
}

function LogoOnlyAppBar<TApplicationLinkProps>({
  applicationId,
  applicationLinkComponent,
  getApplicationLinkComponentProps,
  largeAppBar,
  navSlug,
  preview,
  ...appBarProps
}: LogoOnlyAppBarProps<TApplicationLinkProps>) {
  const { data: { logoNavItem } = {} } = useNavContentData({ preview, slug: navSlug });

  return (
    <AppBar {...appBarProps}>
      <SiteLogo
        applicationId={applicationId}
        applicationLinkComponent={applicationLinkComponent}
        getApplicationLinkComponentProps={getApplicationLinkComponentProps}
        navItem={logoNavItem}
      />
    </AppBar>
  );
}

export default LogoOnlyAppBar;
