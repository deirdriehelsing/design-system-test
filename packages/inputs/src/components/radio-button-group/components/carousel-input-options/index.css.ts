import { globalStyle, style } from '@vanilla-extract/css';

const swiper = style({
  maxWidth: '100%',
});

const swiperChip = style({
  padding: '2px',
});

const swiperSlide = style({});

globalStyle(`${swiperSlide}${swiperSlide}`, {
  width: 'unset',
});

export { swiper, swiperChip, swiperSlide };
