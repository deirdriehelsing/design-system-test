import { Navigation, Pagination } from 'swiper';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';
import { useMemo } from 'react';

type ControlsVariant = 'default' | 'sideArrows';

interface UseSwiperPropsParams {
  controlsVariant?: ControlsVariant;
  size?: 'large' | 'small';
  spaceBetween?: number | string;
  swiperId?: string;
}

function useSwiperProps({
  controlsVariant = 'default',
  size,
  spaceBetween,
  swiperId,
}: UseSwiperPropsParams) {
  const { isLargeViewport } = useBreakpoints();

  if (!size) {
    size = isLargeViewport ? 'large' : 'small';
  }

  if (!spaceBetween) {
    spaceBetween = isLargeViewport ? 24 : 16;
  }

  const hasNavigation = controlsVariant === 'sideArrows' && size !== 'small';
  const hasPagination = controlsVariant === 'default' && size === 'small';

  const modules = useMemo(
    () => [...(hasNavigation ? [Navigation] : []), ...(hasPagination ? [Pagination] : [])],
    [hasNavigation, hasPagination]
  );

  return {
    modules,
    navigation: hasNavigation && {
      disabledClass: 'Mui-disabled',
      nextEl: `.swiper-${swiperId}-button-next`,
      prevEl: `.swiper-${swiperId}-button-prev`,
    },
    pagination: hasPagination && {
      clickable: true,
    },
    size,
    spaceBetween,
  };
}

export default useSwiperProps;

export type { ControlsVariant };
