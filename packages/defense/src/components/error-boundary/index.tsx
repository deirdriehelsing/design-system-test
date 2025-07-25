import DefaultErrorContent from './components/default-error-content';
import React from 'react';

interface ErrorBoundaryProps extends React.PropsWithChildren {
  errorContent?: React.ReactElement;
  logger?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// See: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    logger: console.error,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.logger?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorContent ?? <DefaultErrorContent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
