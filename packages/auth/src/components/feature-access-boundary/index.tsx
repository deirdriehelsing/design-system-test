import type { PropsWithChildren, ReactNode } from 'react';
import type { FeatureAccessCriteria } from '../../types';

import React from 'react';
import useFeatureAccess from '../../hooks/use-feature-access';

interface FeatureAccessBoundaryProps extends PropsWithChildren, FeatureAccessCriteria {
  /**
   * The fallback to render when the user does not have feature access.
   * @default null
   */
  accessFallback?: ReactNode;
  /**
   * The fallback to render when feature access data is loading.
   * @default null
   */
  loadingFallback?: ReactNode;
}

function FeatureAccessBoundary({
  accessFallback = null,
  children,
  criteria,
  loadingFallback = null,
}: FeatureAccessBoundaryProps) {
  const { hasAccess, isLoading: isLoadingFeatureAccess } = useFeatureAccess({
    criteria,
  });

  if (isLoadingFeatureAccess) {
    return <>{loadingFallback}</>;
  }

  if (!hasAccess) {
    return <>{accessFallback}</>;
  }

  return <>{children}</>;
}

export default FeatureAccessBoundary;
