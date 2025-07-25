import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { IntegrationWrapper } from '@blueshift-ui/testing-library';
import LargeAppBar from '.';
import React from 'react';
import { fixtures } from '@blueshift-ui/testing-fixtures';
import useNavContentData from '../../hooks/use-nav-content-data';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/use-nav-content-data');
jest.mock('../logo', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="site-logo">
      <img alt="Varsity Tutors" src="mock-logo-url" />
    </div>
  ),
}));
jest.mock('../search-bar', () => ({
  __esModule: true,
  default: ({ onSubmit }) => (
    <div data-testid="search-bar">
      <input onChange={(event) => onSubmit(event.target.value)} role="searchbox" type="search" />
    </div>
  ),
}));
jest.mock('../primary-nav', () => ({
  __esModule: true,
  default: () => <div data-testid="primary-nav">Primary Nav</div>,
}));
jest.mock('../account-nav', () => ({
  __esModule: true,
  default: ({ withAvatar }) => (
    <div data-testid="account-nav">{!withAvatar ? null : <div>Avatar</div>}</div>
  ),
}));

const { authenticatedUser, navContentData } = fixtures;

// Extract navigation data from the fixture
const mockNavData = {
  logoNavItem: {
    ...navContentData.vt4sStudent.results[0].data.navigation.menus[0],
    application_id: 'my-learning',
  },
  primaryNavItems: navContentData.vt4sStudent.results[0].data.navigation.menus.slice(1),
  accountNavItems: [{ text: 'Account', href: '/account' }],
};

// Extract the user data from the fixture
const mockUser = {
  ...authenticatedUser.vt4sStudent.entity,
  client_id: 1,
  client_uuid: 'test-uuid',
  first_name: 'Test',
  product_state: 'vt4s' as const,
  role: 'student' as const,
  tutor_id: undefined,
  tutor_uuid: undefined,
};

describe('<LargeAppBar />', () => {
  beforeEach(() => {
    (useNavContentData as jest.Mock).mockReturnValue({
      data: mockNavData,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    (useNavContentData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<LargeAppBar accountOnly={false} renderPrimaryNav renderSearchbar user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    const skeletons = screen.getAllByLabelText('loading');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders logo, search bar, primary nav, and account nav when all props are provided', () => {
    render(<LargeAppBar accountOnly={false} renderPrimaryNav renderSearchbar user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.getByTestId('site-logo')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('primary-nav')).toBeInTheDocument();
    expect(screen.getByTestId('account-nav')).toBeInTheDocument();
  });

  it('renders account only (no avatar) when accountOnly is true', () => {
    render(<LargeAppBar accountOnly={true} renderPrimaryNav renderSearchbar user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.getByTestId('account-nav')).toBeInTheDocument();
    expect(screen.queryByText('Avatar')).not.toBeInTheDocument();
  });

  it('does not render primary nav when renderPrimaryNav is false', () => {
    render(<LargeAppBar accountOnly={false} renderSearchbar user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.queryByTestId('primary-nav')).not.toBeInTheDocument();
  });

  it('does not render search bar when renderSearchbar is false', () => {
    render(<LargeAppBar accountOnly={false} renderPrimaryNav user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
  });

  it('passes applicationLinkComponent and props to child components', () => {
    const MyCustomLink = ({ children, href, customProp }) => (
      <a data-custom-prop={customProp} data-testid="custom-link" href={href}>
        {children}
      </a>
    );

    const getProps = (props) => ({
      ...props,
      customProp: 'test-custom-prop',
    });

    render(
      <LargeAppBar
        accountOnly={false}
        applicationId="my-learning"
        applicationLinkComponent={MyCustomLink}
        getApplicationLinkComponentProps={getProps}
        renderPrimaryNav
        renderSearchbar
        user={mockUser}
      />,
      { wrapper: IntegrationWrapper }
    );

    expect(useNavContentData).toHaveBeenCalledWith({
      baseUrl: undefined,
      currentApplicationId: 'my-learning',
      preview: undefined,
      slug: undefined,
    });

    expect(screen.getByTestId('site-logo')).toBeInTheDocument();
    expect(screen.getByTestId('primary-nav')).toBeInTheDocument();
    expect(screen.getByTestId('account-nav')).toBeInTheDocument();
  });

  it('handles search submission correctly', async () => {
    const onSearchSubmit = jest.fn();

    render(
      <LargeAppBar
        accountOnly={false}
        onSearchSubmit={onSearchSubmit}
        renderPrimaryNav
        renderSearchbar
      />,
      { wrapper: IntegrationWrapper }
    );

    const searchInput = screen.getByRole('searchbox');
    await userEvent.type(searchInput, 'test search');

    expect(onSearchSubmit).toHaveBeenCalledWith('test search');
  });
});
