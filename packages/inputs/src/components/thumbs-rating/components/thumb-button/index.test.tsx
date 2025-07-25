import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ThumbButton from '.';
import { ThumbsRatingVariants } from '../../../../constants/thumbs-rating-variants';
import userEvent from '@testing-library/user-event';

jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));

describe('<ThumbButton />', () => {
  it('renders', () => {
    render(<ThumbButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each([
    { icon: 'ThumbsUp Icon', variant: 'up' },
    { icon: 'ThumbsDown Icon', variant: 'down' },
  ])('renders correct icon for variant %s', (variant) => {
    render(<ThumbButton variant={variant} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each(Object.values(ThumbsRatingVariants))(
    'calls onClick handler with correct variant',
    async (variant) => {
      const onClick = jest.fn();
      const user = userEvent.setup();

      render(<ThumbButton onClick={onClick} variant={variant} />);

      user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1);
      });

      expect(onClick).toHaveBeenCalledWith(variant);
    }
  );

  it.each([
    { expected: 'outlined', value: ThumbsRatingVariants.DOWN, variant: ThumbsRatingVariants.UP },
    { expected: 'contained', value: ThumbsRatingVariants.UP, variant: ThumbsRatingVariants.UP },
    { expected: 'outlined', value: ThumbsRatingVariants.UP, variant: ThumbsRatingVariants.DOWN },
    { expected: 'contained', value: ThumbsRatingVariants.DOWN, variant: ThumbsRatingVariants.DOWN },
  ])(
    'Updates variant depending on value: $expected for value $value and variant $variant',
    ({ value, variant, expected }) => {
      render(<ThumbButton value={value} variant={variant} />);

      expect(screen.getByRole('button')).toHaveClass(new RegExp(expected));
    }
  );
});
