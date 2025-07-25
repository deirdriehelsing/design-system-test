import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '.';
import React from 'react';

function _ExplodingComponent(): JSX.Element {
  throw new Error('💥');
}

function _CustomErrorContent() {
  return <>Custom error content…</>;
}

describe('<ErrorBoundary />', () => {
  beforeEach(() => {
    // Quite warning in jest output
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(ErrorBoundary.defaultProps, 'logger').mockImplementation(() => {});
  });

  describe('when there is no error', () => {
    it('renders component tree normally', () => {
      render(<ErrorBoundary>Some wrapped content…</ErrorBoundary>);
      expect(screen.getByText(/Some wrapped content…/i)).toBeInTheDocument();
    });
  });

  describe('when there is an error', () => {
    describe('with default error content', () => {
      it('catches errors and shows default content', () => {
        render(
          <ErrorBoundary>
            <_ExplodingComponent />
          </ErrorBoundary>
        );
        expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
      });
    });

    describe('with custom error content', () => {
      it('catches errors and shows custom content', () => {
        render(
          <ErrorBoundary errorContent={<_CustomErrorContent />}>
            <_ExplodingComponent />
          </ErrorBoundary>
        );
        expect(screen.getByText(/Custom error content…/i)).toBeInTheDocument();
      });
    });
  });
});
