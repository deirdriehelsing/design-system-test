import type { ThumbsRatingVariants } from '../constants/thumbs-rating-variants';

type ThumbsRatingVariant = (typeof ThumbsRatingVariants)[keyof typeof ThumbsRatingVariants];

export type { ThumbsRatingVariant };
