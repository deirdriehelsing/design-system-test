import type { AuthenticatedUser, Student } from '@blueshift-ui/auth';

import { render, screen } from '@testing-library/react';
import Button from '@blueshift-ui/core/dist/components/button';
import React from 'react';
import SiteNav from './index';
import useMediaQuery from '@blueshift-ui/theme/dist/hooks/use-media-query';
import userEvent from '@testing-library/user-event';

const useMediaQueryMock = useMediaQuery as jest.Mock;
const mockNavContent = {
  data: {
    accountNavItems: [
      {
        slug: 'account_auth',
        text: 'Account',
        items: [
          {
            application_id: 'account',
            text: 'Switch or manage profiles',
            href: '/account/client/profiles',
          },
          {
            application_id: 'account',
            text: 'Membership',
            href: '/account/client/membership',
          },
          {
            application_id: 'account',
            text: 'Activity',
            href: '/account/client/membership/activity',
          },
          {
            text: 'Help Center',
            href: 'https://vtcrt.zendesk.com/hc/en-us',
            target: '_blank',
          },
        ],
      },
    ],
    logoNavItem: {
      application_id: 'logo-test',
      href: '/',
      items: [],
      slug: 'logo',
      text: 'Varsity Tutors',
    },
    primaryNavItems: [
      {
        slug: 'test',
        text: 'Test',
        href: '/test/client',
        items: [
          {
            text: 'Classes',
            href: '/classes',
          },
          {
            divider: true,
          },
          {
            text: 'Subjects',
            href: '',
            slug: 'subjects',
            items: [
              {
                application_id: 'my-learning',
                text: 'Subject A',
                href: '/subjects/a',
              },
              {
                application_id: 'subjects',
                text: 'Subject B',
                href: '/subjects/b',
              },
            ],
          },
        ],
      },
    ],
  },
};

const mockStudent = {
  enrolled: true,
  first_name: 'Buzz',
  grade_list_id: 1,
  last_name: 'Aldrin',
  student_user_id: 'mock-student-user-id',
  user_id: 'mock-user-id',
  uuid: 'mock-uuid',
} as Student;

const mockUser = {
  client_id: 1,
  client_uuid: 'mock-client-uuid',
  first_name: 'Neil',
  id: 0,
  jurisdiction_id: '123',
  last_name: 'Armstrong',
  login: 'test',
  product_state: 'one_on_one_membership',
  role: 'client',
  students: [mockStudent],
} as unknown as AuthenticatedUser;

jest.mock('@blueshift-ui/data-display/dist/components/avatar', () => () => <samp>Avatar</samp>);
jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));
jest.mock('@blueshift-ui/theme/dist/hooks/use-media-query', () => jest.fn());
jest.mock('./hooks/use-nav-content-data', () => {
  return jest.fn(() => mockNavContent);
});

describe('<SiteNav />', () => {
  describe('without user', () => {
    it('renders correctly', () => {
      useMediaQueryMock.mockReturnValue(true);

      render(<SiteNav applicationId="my-learning" navSlug="mock_nav_slag" />);

      expect(screen.getByAltText('Varsity Tutors')).toBeInTheDocument();
      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });
  });

  describe('with user', () => {
    describe('without drawer', () => {
      beforeEach(() => {
        useMediaQueryMock.mockReturnValue(true);
      });

      it('renders correctly', async () => {
        const user = userEvent.setup();
        render(
          <SiteNav
            activeLearner={mockStudent}
            applicationId="my-learning"
            navSlug="mock_nav_slag"
            user={mockUser}
          />
        );

        expect(screen.getByAltText('Varsity Tutors')).toBeInTheDocument();
        expect(screen.getByText('Test')).toBeInTheDocument();
        expect(screen.getByText('Avatar')).toBeInTheDocument();

        await user.click(screen.getByText('Avatar'));

        expect(screen.getByText('Switch or manage profiles')).toBeInTheDocument();
        expect(screen.getByText('Help Center')).toHaveAttribute('target', '_blank');
      });

      it('uses custom links when provided', async () => {
        const user = userEvent.setup();
        render(
          <SiteNav
            activeLearner={mockStudent}
            applicationId="account"
            applicationLinkComponent="span"
            getApplicationLinkComponentProps={() => ({
              'data-my-link-attribute': 'mock',
              role: 'link',
            })}
            navSlug="mock_nav_slag"
            user={mockUser}
          />
        );
        await user.click(screen.getByText('Avatar'));

        ['Switch or manage profiles', 'Membership', 'Activity'].forEach((linkText) => {
          const link = screen.getByText(linkText);
          expect(link).toBeInstanceOf(HTMLSpanElement);
          expect(link).toHaveAttribute('data-my-link-attribute', 'mock');
          expect(link).toHaveAttribute('role', 'link');
        });
      });

      it('uses custom link for the logo when provided', () => {
        render(
          <SiteNav
            applicationId="logo-test"
            applicationLinkComponent={Button}
            getApplicationLinkComponentProps={(props) => ({
              ...props,
              href: `${props.href}custom-logo-link`,
            })}
            navSlug="mock_nav_slag"
          />
        );

        const link = screen.getByRole('link', { name: 'Varsity Tutors' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass('MuiButtonBase-root');
        expect(link).toHaveAttribute('href', '/custom-logo-link');
      });
    });

    describe('with drawer', () => {
      beforeEach(() => {
        useMediaQueryMock.mockReturnValue(false);
      });

      it('renders correctly', () => {
        render(<SiteNav navSlug="mock_nav_slag" user={mockUser} />);

        expect(screen.getByRole('button')).not.toBeNull();
      });

      it('renders correctly with search', () => {
        render(<SiteNav navSlug="mock_nav_slag" user={mockUser} withSearch={true} />);

        const searchToggleButton = screen.getByLabelText('search');
        expect(searchToggleButton).toHaveAttribute('aria-controls', 'search-view');
        expect(searchToggleButton).toHaveAttribute('aria-expanded', 'false');
        expect(searchToggleButton).toHaveAttribute('aria-label', 'search');
      });

      it('uses custom links when provided', async () => {
        const user = userEvent.setup();
        render(
          <SiteNav
            activeLearner={mockStudent}
            applicationId="account"
            applicationLinkComponent="span"
            getApplicationLinkComponentProps={() => ({
              'data-my-link-attribute': 'mock',
              role: 'link',
            })}
            navSlug="mock_nav_slag"
            user={mockUser}
          />
        );

        await user.click(screen.getByText('List Icon'));

        await user.click(screen.getByText('Avatar'));

        ['Switch or manage profiles', 'Membership', 'Activity'].forEach((linkText) => {
          const link = screen.getByText(linkText);
          expect(link).toBeInstanceOf(HTMLSpanElement);

          // In this scenario, getApplicationLinkComponentProps are passed
          //  to the grandparent element, not the element itself.
          // Worth keeping this in mind for future bugs, but
          //  no bandwidth to look into whether it's intended behavior for now.
          /* eslint-disable-next-line testing-library/no-node-access */
          const linkGrandparent = link.parentElement?.parentElement;
          expect(linkGrandparent).toHaveAttribute('data-my-link-attribute', 'mock');
          expect(linkGrandparent).toHaveAttribute('role', 'link');
        });
      });

      it('uses custom link for the logo when the screen is small', () => {
        render(
          <SiteNav
            applicationId="logo-test"
            applicationLinkComponent={Button}
            getApplicationLinkComponentProps={(props) => ({
              ...props,
              href: `${props.href}custom-logo-link`,
            })}
            navSlug="mock_nav_slag"
          />
        );

        const link = screen.getByRole('link', { name: 'Varsity Tutors' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/custom-logo-link');
      });
    });
  });

  describe('logo only variant', () => {
    it.each([
      { navSlug: 'mock_nav_slag', variant: 'logo-only' as const },
      { navSlug: undefined, variant: undefined },
    ])('renders correctly when navSlug is $navSlug and variant is $variant', (props) => {
      render(<SiteNav {...props} applicationId="my-learning" />);

      expect(screen.getByAltText('Varsity Tutors')).toBeInTheDocument();
      expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
      expect(screen.queryByText('Avatar')).not.toBeInTheDocument();
    });
  });
});
