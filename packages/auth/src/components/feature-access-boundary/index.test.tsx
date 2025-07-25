import { render, screen } from '@testing-library/react';
import FeatureAccessBoundary from '.';
import React from 'react';
import useFeatureAccess from '../../hooks/use-feature-access';

const mockedUseFeatureAccess = useFeatureAccess as jest.Mock;

jest.mock('../../hooks/use-feature-access');

describe('<FeatureAccessBoundary />', () => {
  describe('setup', () => {
    it('calls useFeatureAccess correctly when a single criteria is passed', () => {
      mockedUseFeatureAccess.mockReturnValue({ hasAccess: false, isLoading: false });
      render(
        <FeatureAccessBoundary criteria={{ enablement: 'some_enablement' }}>
          Content
        </FeatureAccessBoundary>
      );
      expect(mockedUseFeatureAccess).toHaveBeenCalledTimes(1);
      expect(mockedUseFeatureAccess).toHaveBeenCalledWith({
        criteria: {
          enablement: 'some_enablement',
        },
      });
    });

    it('calls useFeatureAccess correctly when multiple criteria are passed', () => {
      mockedUseFeatureAccess.mockReturnValue({ hasAccess: false, isLoading: false });
      render(
        <FeatureAccessBoundary criteria={[{ enablement: 'some_enablement' }, { role: 'student' }]}>
          Content
        </FeatureAccessBoundary>
      );
      expect(mockedUseFeatureAccess).toHaveBeenCalledTimes(1);
      expect(mockedUseFeatureAccess).toHaveBeenCalledWith({
        criteria: [
          {
            enablement: 'some_enablement',
          },
          {
            role: 'student',
          },
        ],
      });
    });
  });

  describe('when data is loading', () => {
    it('renders nothing', () => {
      mockedUseFeatureAccess.mockReturnValue({ isLoading: true });
      render(
        <FeatureAccessBoundary criteria={{ enablement: 'some_enablement' }}>
          Content
        </FeatureAccessBoundary>
      );
      expect(screen.queryByText(/Content/)).not.toBeInTheDocument();
    });
  });

  describe('when user does not have feature access', () => {
    beforeEach(() => {
      mockedUseFeatureAccess.mockReturnValue({ hasAccess: false, isLoading: false });
    });

    describe('without access fallback', () => {
      it('renders nothing', () => {
        render(
          <FeatureAccessBoundary criteria={{ enablement: 'some_enablement' }}>
            Content
          </FeatureAccessBoundary>
        );
        expect(screen.queryByText(/Content/)).not.toBeInTheDocument();
      });
    });

    describe('with access fallback', () => {
      it('renders fallback', () => {
        render(
          <FeatureAccessBoundary
            accessFallback="Fallback"
            criteria={{ enablement: 'some_enablement' }}
          >
            Content
          </FeatureAccessBoundary>
        );
        expect(screen.getByText(/Fallback/)).toBeInTheDocument();
      });
    });
  });

  describe('when user has feature access', () => {
    beforeEach(() => {
      mockedUseFeatureAccess.mockReturnValue({ hasAccess: true, isLoading: false });
    });

    it('renders children', () => {
      render(
        <FeatureAccessBoundary criteria={{ enablement: 'some_enablement' }}>
          Content
        </FeatureAccessBoundary>
      );
      expect(screen.getByText(/Content/)).toBeInTheDocument();
    });
  });
});
