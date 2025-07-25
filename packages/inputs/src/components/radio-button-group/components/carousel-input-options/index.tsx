import type { RadioInputOptionsProps } from '../../../../types';

import './swiper.css';
import * as styles from './index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import InputOption from '../radio-input-option';
import { Pagination } from 'swiper';
import React from 'react';
import classNames from 'classnames';

function CarouselInputOptions({ inputOptions, variant }: RadioInputOptionsProps) {
  return (
    <Swiper
      className={styles.swiper}
      modules={[Pagination]}
      slidesPerGroupAuto={true}
      slidesPerView="auto"
      spaceBetween={16}
    >
      {inputOptions.map((inputOption) => (
        <SwiperSlide
          className={classNames(styles.swiperSlide, {
            [styles.swiperChip]: variant === 'chips',
          })}
          key={inputOption.value}
        >
          <InputOption inputOption={inputOption} key={inputOption.value} variant={variant} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CarouselInputOptions;
