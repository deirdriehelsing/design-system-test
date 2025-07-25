import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { IntegrationWrapper } from '@blueshift-ui/testing-library';
import React from 'react';
import SmallAppBar from '.';
import { fixtures } from '@blueshift-ui/testing-fixtures';
import useNavContentData from '../../hooks/use-nav-content-data';
import useScrollLock from '../../hooks/use-scroll-lock';
import userEvent from '@testing-library/user-event';

// Mock the hooks we depend on
jest.mock('../../hooks/use-nav-content-data');
jest.mock('../../hooks/use-scroll-lock');

// Mock SearchView component minimally
jest.mock('../search-view', () => ({
  __esModule: true,
  default: ({ onClose, onSubmit }: { onClose: () => void; onSubmit?: (query: string) => void }) => {
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (onSubmit) {
        // Access value through event.currentTarget rather than using querySelector
        const form = event.currentTarget as HTMLFormElement;
        const inputValue = form.elements.namedItem('search-input') as HTMLInputElement;
        onSubmit(inputValue.value);
      }
    };

    return (
      <div data-testid="search-view" role="dialog">
        <form onSubmit={handleSubmit}>
          <input name="search-input" role="searchbox" type="search" />
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  },
}));

const { authenticatedUser, navContentData } = fixtures;

// Extract the student data from the fixture
const mockUser = {
  ...authenticatedUser.vt4sStudent.entity,
  client_id: 1,
  client_uuid: 'test-uuid',
  product_state: 'vt4s' as const,
  role: 'student' as const,
  tutor_id: undefined,
  tutor_uuid: undefined,
};

// Extract navigation data from the fixture
const mockNavData = {
  logoNavItem: navContentData.vt4sStudent.results[0].data.navigation.menus[0],
  primaryNavItems: navContentData.vt4sStudent.results[0].data.navigation.menus.slice(1),
  accountNavItems: [{ text: 'Account', href: '/account' }],
};

describe('<SmallAppBar />', () => {
  beforeEach(() => {
    (useNavContentData as jest.Mock).mockReturnValue({
      data: mockNavData,
      isLoading: false,
    });
    (useScrollLock as jest.Mock).mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    (useNavContentData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<SmallAppBar accountOnly={false} renderPrimaryNav renderSearchbar user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    const loadingSkeletons = screen.getAllByLabelText('loading');

    expect(loadingSkeletons).toHaveLength(1);
  });

  it('renders search button when renderSearchbar is true', () => {
    render(<SmallAppBar accountOnly={false} renderSearchbar />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('does not render search button when renderSearchbar is false', () => {
    render(<SmallAppBar accountOnly={false} />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
  });

  it('toggles search view when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<SmallAppBar accountOnly={false} renderSearchbar />, {
      wrapper: IntegrationWrapper,
    });

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(searchButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('handles search submission correctly', async () => {
    const onSearchSubmit = jest.fn();
    const user = userEvent.setup();

    render(<SmallAppBar accountOnly={false} onSearchSubmit={onSearchSubmit} renderSearchbar />, {
      wrapper: IntegrationWrapper,
    });

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'test search');

    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onSearchSubmit).toHaveBeenCalledWith('test search');
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('renders hamburger nav when renderPrimaryNav and user are provided', () => {
    render(<SmallAppBar accountOnly={false} renderPrimaryNav user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.getByLabelText('Menu')).toBeInTheDocument();
  });

  it('does not render hamburger nav when renderPrimaryNav is false', () => {
    render(<SmallAppBar accountOnly={false} user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.queryByLabelText('Menu')).not.toBeInTheDocument();
  });

  it('renders hamburger nav when renderPrimaryNav is false but account menu is provided', async () => {
    (useNavContentData as jest.Mock).mockReturnValue({
      data: {
        ...mockNavData,
        accountNavItems: [
          {
            ...mockNavData.accountNavItems[0],
            items: [{ text: 'Sign out', href: '/logout' }],
          },
        ],
      },
      isLoading: false,
    });

    const user = userEvent.setup();

    render(<SmallAppBar accountOnly={false} user={mockUser} />, {
      wrapper: IntegrationWrapper,
    });

    expect(screen.getByLabelText('Menu')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Menu'));

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
