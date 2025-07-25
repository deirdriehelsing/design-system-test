import type { CarouselProps } from '../../types/carousel-props';
import type { ReactNode } from 'react';

import './swiper.css';
import * as styles from './index.css';
import { CaretLeft as CaretLeftIcon, CaretRight as CaretRightIcon } from '@phosphor-icons/react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import Container from '@blueshift-ui/core/dist/components/container';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import React from 'react';
import Stack from '@blueshift-ui/core/dist/components/stack';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';
import { useInView } from 'react-intersection-observer';
import useSwiperProps from './hooks/use-swiper-props';

function _validate(swiper: typeof Swiper, callback: () => void) {
  if (!swiper || swiper.destroyed) {
    return;
  }

  callback();
}

interface _SwiperButtonsProps {
  activeStep: number;
  maxSteps: number;
}

function _SwiperButtons({ activeStep, maxSteps }: _SwiperButtonsProps) {
  const swiper = useSwiper();
  const [isNextDisabled, setIsNextDisabled] = React.useState(
    swiper ? swiper.isEnd : activeStep === maxSteps - 1
  );

  function handlePreviousClick() {
    _validate(swiper, () => swiper.slidePrev());
  }

  function handleNextClick() {
    _validate(swiper, () => swiper.slideNext());
  }

  React.useEffect(() => {
    function handleSwiperChange() {
      setIsNextDisabled(swiper.isEnd);
    }

    function handleSlidesLengthChange() {
      swiper.update();
    }

    _validate(swiper, () => {
      swiper.on('slidesLengthChange', handleSlidesLengthChange);
      swiper.onAny(handleSwiperChange);
    });

    return function cleanupOnUnmount() {
      _validate(swiper, () => {
        swiper.off('slidesLengthChange', handleSlidesLengthChange);
        swiper.offAny(handleSwiperChange);
      });
    };
  }, [swiper]);

  return (
    <Stack direction="row" spacing={2}>
      <IconButton
        aria-label="Previous"
        className={styles.button}
        disabled={activeStep === 0}
        onClick={handlePreviousClick}
        size="large"
      >
        <CaretLeftIcon />
      </IconButton>

      <IconButton
        aria-label="Next"
        className={styles.button}
        disabled={isNextDisabled}
        onClick={handleNextClick}
        size="large"
      >
        <CaretRightIcon />
      </IconButton>
    </Stack>
  );
}

function ObservableInert({
  children,
  root,
  threshold = 0.95,
}: {
  children: ReactNode;
  root?: HTMLDivElement | null;
  threshold?: number;
}) {
  const { ref } = useInView({
    root,
    threshold,
    onChange: (inView, entry) => {
      if (inView) {
        entry.target.removeAttribute('aria-hidden');
        entry.target.removeAttribute('inert');
      } else {
        entry.target.setAttribute('aria-hidden', 'true');
        entry.target.setAttribute('inert', '');
      }
    },
  });

  return <div ref={ref}>{children}</div>;
}

function Carousel({
  controlsVariant = 'default',
  description,
  descriptionComponent = 'div',
  descriptionVariant = 'bodySmall',
  disableOutOfView = false,
  items,
  maxWidth = 'lg',
  onChange,
  size,
  spaceBetween,
  title,
  titleComponent = 'h2',
  titleVariant = 'headlineSmall',
}: CarouselProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = React.useMemo(() => items.length, [items]);
  const ref = React.useRef<HTMLDivElement>(null);

  const swiperId = React.useId().replaceAll(':', '');

  const swiperProps = useSwiperProps({
    controlsVariant,
    swiperId,
    size,
    spaceBetween,
  });

  function handleSlideChange(swiper: any) {
    setActiveStep(swiper.activeIndex);
    onChange?.();
  }

  return (
    <Container
      className={classNames(styles.container, {
        [styles.containerWithNavigation]: swiperProps.navigation,
      })}
      component="section"
      sx={{ maxWidth }}
    >
      {swiperProps.navigation ? (
        <div className={styles.navigationButtonContainer}>
          <IconButton className={`swiper-${swiperId}-button-prev`}>
            <CaretLeftIcon />
          </IconButton>
        </div>
      ) : null}

      <Swiper
        className={classNames(styles.swiper[swiperProps.size])}
        onSlideChange={handleSlideChange}
        ref={ref}
        slidesPerGroupAuto={true}
        slidesPerView={'auto'}
        {...swiperProps}
      >
        {!swiperProps.navigation || title ? (
          <header
            className={styles.header[swiperProps.size]}
            /* the 'slot' prop is necessary for Swiper to render the header above the carousel items */
            slot="container-start"
          >
            {title && (
              <div className={styles.heading}>
                <Typography component={titleComponent} variant={titleVariant}>
                  {title}
                </Typography>

                {description && (
                  <Typography
                    className={styles.description}
                    component={descriptionComponent}
                    variant={descriptionVariant}
                  >
                    {description}
                  </Typography>
                )}
              </div>
            )}

            {!swiperProps.navigation && swiperProps.size !== 'small' && (
              <_SwiperButtons activeStep={activeStep} maxSteps={maxSteps} />
            )}
          </header>
        ) : null}

        {items.map((item, index) => (
          <SwiperSlide className={styles.swiperSlide} key={item.key || index}>
            {disableOutOfView ? <ObservableInert root={ref.current}>{item}</ObservableInert> : item}
          </SwiperSlide>
        ))}
      </Swiper>

      {swiperProps.navigation ? (
        <div className={styles.navigationButtonContainer}>
          <IconButton className={`swiper-${swiperId}-button-next`}>
            <CaretRightIcon />
          </IconButton>
        </div>
      ) : null}
    </Container>
  );
}

export default Carousel;
