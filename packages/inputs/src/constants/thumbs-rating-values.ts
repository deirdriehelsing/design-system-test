import { ThumbsRatingVariants } from './thumbs-rating-variants';

const ThumbsRatingValues = [...Object.values(ThumbsRatingVariants), null] as const;

export { ThumbsRatingValues };
