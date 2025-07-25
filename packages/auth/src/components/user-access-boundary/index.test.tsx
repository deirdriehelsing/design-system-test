import { render, screen } from '@testing-library/react';
import React from 'react';
import UserAccessBoundary from '.';
import useAuthenticatedUser from '../../hooks/use-authenticated-user';

const mockedUseAuthenticatedUser = useAuthenticatedUser as jest.Mock;

jest.mock('@blueshift-ui/fetch');

jest.mock('../../hooks/use-authenticated-user');

Object.defineProperty(window, 'location', {
  value: {
    assign: jest.fn(),
    host: 'www.vttest.com',
    origin: 'https://www.vttest.com',
  },
});

describe('<UserAccessBoundary />', () => {
  describe('when data is loading', () => {
    it('renders loading fallback', () => {
      mockedUseAuthenticatedUser.mockReturnValue({ loading: true });

      render(
        <UserAccessBoundary applicationId="test" loadingFallback="Loading" roles={['client']}>
          Content
        </UserAccessBoundary>
      );

      expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });

    it('does not render loading fallback if loadingFallback is false', () => {
      mockedUseAuthenticatedUser.mockReturnValue({ loading: true });

      render(
        <UserAccessBoundary applicationId="test" loadingFallback={false} roles={['client']}>
          Content
        </UserAccessBoundary>
      );

      expect(screen.getByText(/Content/)).toBeInTheDocument();
    });
  });

  describe('when data is loaded', () => {
    beforeEach(() => {
      mockedUseAuthenticatedUser.mockReturnValue({
        data: {
          client_id: 'mock-client-id',
          product_state: 'mock-product-state',
          role: 'client',
          user_id: 'mock-user-id',
        },
        loading: false,
      });
    });

    it('bypasses user cache', () => {
      render(
        <UserAccessBoundary
          applicationId="test"
          bypassAuthenticatedUserCache={true}
          loadingFallback="Loading"
          roles={['client']}
        >
          Content
        </UserAccessBoundary>
      );

      expect(mockedUseAuthenticatedUser).toHaveBeenCalledWith({ bypassCache: true });
    });

    it('does not bypass user cache', () => {
      render(
        <UserAccessBoundary applicationId="test" loadingFallback="Loading" roles={['client']}>
          Content
        </UserAccessBoundary>
      );

      expect(mockedUseAuthenticatedUser).toHaveBeenCalledWith({ bypassCache: false });
    });
  });

  describe(`when user's role is not allowed`, () => {
    beforeEach(() => {
      mockedUseAuthenticatedUser.mockReturnValue({
        data: {
          client_id: 'mock-client-id',
          product_state: 'mock-product-state',
          role: 'tutor',
          user_id: 'mock-user-id',
        },
        loading: false,
      });
    });

    it('renders loading fallback', () => {
      render(
        <UserAccessBoundary applicationId="test" loadingFallback="Loading" roles={['client']}>
          Content
        </UserAccessBoundary>
      );

      expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });

    it('does not render loading fallback if loadingFallback is false', () => {
      render(
        <UserAccessBoundary applicationId="test" loadingFallback={false} roles={['client']}>
          Content
        </UserAccessBoundary>
      );

      expect(screen.getByText(/Content/)).toBeInTheDocument();
    });

    it('redirects to login', () => {
      render(
        <UserAccessBoundary applicationId="test" loadingFallback="Loading" roles={['client']}>
          Content
        </UserAccessBoundary>
      );

      expect(window.location.assign).toHaveBeenCalled();
      expect(window.location.assign).toHaveBeenCalledWith(
        `https://www.vttest.com/login?return_to=${encodeURIComponent(window.location.href)}`
      );
    });

    it('appends debug info to url', () => {
      render(
        <UserAccessBoundary
          applicationId="test"
          debug={true}
          loadingFallback="Loading"
          roles={['client']}
        >
          Content
        </UserAccessBoundary>
      );

      expect(window.location.assign).toHaveBeenCalled();
      expect(window.location.assign).toHaveBeenCalledWith(
        `https://www.vttest.com/login?return_to=${encodeURIComponent(
          window.location.href
        )}&debug=true&redirect_reason=unsupported_role__tutor&user_id=mock-user-id&client_id=mock-client-id&product_state=mock-product-state&role=tutor`
      );
    });
  });

  describe(`when user's role is allowed`, () => {
    beforeEach(() => {
      mockedUseAuthenticatedUser.mockReturnValue({
        data: { role: 'client' },
        loading: false,
      });
    });

    it('renders content', () => {
      render(
        <UserAccessBoundary applicationId="test" roles={['client']}>
          Content
        </UserAccessBoundary>
      );

      expect(screen.getByText(/Content/)).toBeInTheDocument();
    });
  });

  describe('when product state is enforced', () => {
    describe(`when user's product state is not allowed`, () => {
      beforeEach(() => {
        mockedUseAuthenticatedUser.mockReturnValue({
          data: {
            client_id: 'mock-client-id',
            product_state: 'tutoring',
            role: 'client',
            user_id: 'mock-user-id',
          },
          loading: false,
        });
      });

      it('renders loading fallback', () => {
        render(
          <UserAccessBoundary
            applicationId="test"
            loadingFallback="Loading"
            productStates={['one_on_one_membership']}
            roles={['client']}
          >
            Content
          </UserAccessBoundary>
        );

        expect(screen.getByText(/Loading/)).toBeInTheDocument();
      });

      it('does not render loading fallback if loadingFallback is false', () => {
        render(
          <UserAccessBoundary
            applicationId="test"
            loadingFallback={false}
            productStates={['one_on_one_membership']}
            roles={['client']}
          >
            Content
          </UserAccessBoundary>
        );

        expect(screen.getByText(/Content/)).toBeInTheDocument();
      });

      it('redirects to www root', () => {
        render(
          <UserAccessBoundary
            applicationId="test"
            loadingFallback="Loading"
            productStates={['one_on_one_membership']}
            roles={['client']}
          >
            Content
          </UserAccessBoundary>
        );

        expect(window.location.assign).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith('https://www.vttest.com/');
      });

      it('appends debug info to url', () => {
        render(
          <UserAccessBoundary
            applicationId="test"
            debug={true}
            loadingFallback="Loading"
            productStates={['one_on_one_membership']}
            roles={['client']}
          >
            Content
          </UserAccessBoundary>
        );

        expect(window.location.assign).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith(
          'https://www.vttest.com/?debug=true&redirect_reason=unsupported_product_state__tutoring&user_id=mock-user-id&client_id=mock-client-id&product_state=tutoring&role=client'
        );
      });
    });

    describe(`when user's product state is allowed`, () => {
      beforeEach(() => {
        mockedUseAuthenticatedUser.mockReturnValue({
          data: {
            product_state: 'one_on_one_membership',
            role: 'client',
          },
          loading: false,
        });
      });

      it('renders content', () => {
        render(
          <UserAccessBoundary
            applicationId="test"
            productStates={['one_on_one_membership']}
            roles={['client']}
          >
            Content
          </UserAccessBoundary>
        );

        expect(screen.getByText(/Content/)).toBeInTheDocument();
      });
    });
  });

  describe('when active learner is enforced', () => {
    describe('when active learner is not present and the user is not a student', () => {
      beforeEach(() => {
        mockedUseAuthenticatedUser.mockReturnValue({
          data: {
            client_id: 'mock-client-id',
            product_state: 'mock-product-state',
            role: 'client',
            user_id: 'mock-user-id',
          },
          loading: false,
        });
      });

      it('redirects to select profile', () => {
        render(
          <UserAccessBoundary applicationId="test" requireActiveLearner={true} roles={['client']}>
            Content
          </UserAccessBoundary>
        );

        expect(window.location.assign).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith(
          `https://www.vttest.com/my-learning/profile/select?return_to=${encodeURIComponent(
            window.location.href
          )}`
        );
      });

      it('appends debug info to url', () => {
        render(
          <UserAccessBoundary
            applicationId="test"
            debug={true}
            requireActiveLearner={true}
            roles={['client']}
          >
            Content
          </UserAccessBoundary>
        );

        expect(window.location.assign).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith(
          `https://www.vttest.com/my-learning/profile/select?return_to=${encodeURIComponent(
            window.location.href
          )}&debug=true&redirect_reason=no_active_learner&user_id=mock-user-id&client_id=mock-client-id&product_state=mock-product-state&role=client`
        );
      });
    });

    describe('when active learner is not present and the user is a student', () => {
      it('should NOT redirect to select profile', () => {
        mockedUseAuthenticatedUser.mockReturnValue({
          data: {
            client_id: 'mock-client-id',
            role: 'student',
            user_id: 'mock-user-id',
          },
          loading: false,
        });

        render(
          <UserAccessBoundary applicationId="test" requireActiveLearner={true} roles={['student']}>
            Content
          </UserAccessBoundary>
        );

        expect(window.location.assign).not.toHaveBeenCalled();
      });
    });

    it('renders content when active learner is present', () => {
      mockedUseAuthenticatedUser.mockReturnValue({
        activeLearner: { id: 'mock-student-id' },
        data: { role: 'client' },
        loading: false,
      });

      render(
        <UserAccessBoundary applicationId="test" requireActiveLearner={true} roles={['client']}>
          Content
        </UserAccessBoundary>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});
