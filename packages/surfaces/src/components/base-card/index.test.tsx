import { render, screen, waitFor } from '@testing-library/react';
import BaseCard from '.';
import Link from '@blueshift-ui/core/dist/components/link';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('<BaseCard />', () => {
  const action = <Link href="/some/action">CTA</Link>;
  const cardContent = 'I am a card component';
  const onActionAreaClick = jest.fn();

  describe('when there is no child content', () => {
    it('renders nothing', () => {
      const { container } = render(<BaseCard />);

      expect(container.firstChild).toBe(null);
    });
  });

  describe('when action area is present', () => {
    it('renders primary action', () => {
      render(<BaseCard actionAreaProps={{ onClick: onActionAreaClick }}>{cardContent}</BaseCard>);
      expect(screen.getByRole('button', { name: cardContent })).toBeInTheDocument();
    });

    it('applies the primary action props correctly', async () => {
      render(<BaseCard actionAreaProps={{ onClick: onActionAreaClick }}>{cardContent}</BaseCard>);

      const user = userEvent.setup();
      const actionArea = screen.getByRole('button', { name: cardContent });

      user.click(actionArea);

      await waitFor(() => {
        expect(onActionAreaClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when action area is not present', () => {
    it('does not render primary action', () => {
      render(<BaseCard>{cardContent}</BaseCard>);
      expect(screen.queryByRole('button', { name: cardContent })).not.toBeInTheDocument();
    });
  });

  describe('when action/s are present', () => {
    it('renders supplemental action/s', () => {
      render(<BaseCard actions={action}>{cardContent}</BaseCard>);
      expect(screen.getByRole('link', { name: 'CTA' })).toBeVisible();
    });
  });

  describe('when action/s are not present', () => {
    it('does not render supplemental action/s', () => {
      render(<BaseCard>{cardContent}</BaseCard>);
      expect(screen.queryByRole('link', { name: 'CTA' })).not.toBeInTheDocument();
    });
  });

  describe('when media is present', () => {
    it('renders media', () => {
      render(<BaseCard media="path/to/media">{cardContent}</BaseCard>);
      expect(screen.getByRole('img')).toBeVisible();
    });
  });

  describe('when media is not present', () => {
    it('does not render media', () => {
      render(<BaseCard>{cardContent}</BaseCard>);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });
});
