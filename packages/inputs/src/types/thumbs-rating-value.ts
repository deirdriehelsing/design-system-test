import type { ThumbsRatingValues } from '../constants/thumbs-rating-values';

type ThumbsRatingValue = (typeof ThumbsRatingValues)[keyof typeof ThumbsRatingValues];

export type { ThumbsRatingValue };
